import { useState, useEffect } from 'react'
import { patternAPI } from '../utils/api'
import { SWEATER_SIZES } from '../constants/patternSizes'

export type PatternType = 'blanket' | 'hat' | 'sweater'

export interface MotifSize {
  stitches: number
  rows: number
  widthCm: number
  heightCm: number
}

export interface BlanketDimensions {
  width: number
  height: number
}

interface Params {
  currentPattern: string
  loading: boolean
  knittingTensionMin: number
  knittingTensionMax: number
  sizeMin: number
  sizeMax: number
  chestSize: number
  motifDimensions: { width: number; height: number } | null
  motifPositions: { id: string; bottomRightXCm: number; bottomRightYCm: number }[]
  /** Called when a hard calculation error occurs — show the error modal with this message. */
  onError: (message: string) => void
  /** Called on blanket-specific errors — revert sliders to previous valid values. */
  onRevert: () => void
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UsePatternCalculationReturn {
  accordionSections: any[]
  motifSize: MotifSize | null
  blanketDimensions: BlanketDimensions
  /** Call this to immediately (re)calculate without waiting for the debounce. */
  calculate: (type: PatternType) => Promise<void>
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Manages all pattern calculation API calls and their debounced re-runs.
 * Owns accordionSections, motifSize, and blanketDimensions state.
 */
export function usePatternCalculation({
  currentPattern,
  loading,
  knittingTensionMin,
  knittingTensionMax,
  sizeMin,
  sizeMax,
  chestSize,
  motifDimensions,
  motifPositions,
  onError,
  onRevert,
}: Params): UsePatternCalculationReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [accordionSections, setAccordionSections] = useState<any[]>([])
  const [motifSize, setMotifSize] = useState<MotifSize | null>(null)
  const [blanketDimensions, setBlanketDimensions] = useState<BlanketDimensions>({ width: 60, height: 80 })

  const calculate = async (type: PatternType): Promise<void> => {
    const patternFile =
      type === 'blanket' ? 'babyblanket1.pat'
      : type === 'hat'   ? 'hat1.pat'
      :                    'sweater1.pat'

    const width =
      type === 'hat'     ? sizeMin
      : type === 'blanket' ? sizeMin
      : (SWEATER_SIZES[chestSize]?.bodyWidth ?? 56)

    const height =
      type === 'hat'     ? Math.round(sizeMin / 2 - 4)
      : type === 'blanket' ? sizeMax
      : (SWEATER_SIZES[chestSize]?.bodyLength ?? 70)

    try {
      const result = await patternAPI.calculatePattern({
        patternFile,
        tensionX: knittingTensionMin,
        tensionY: knittingTensionMax,
        width,
        height,
        ...(motifDimensions && {
          motifWidth:  motifDimensions.width,
          motifHeight: motifDimensions.height,
        }),
        motifPositions,
      })

      if (result.success) {
        setAccordionSections(result.sections)

        if (result.calculated?.motifWidthStitches && result.calculated?.motifHeightRows) {
          setMotifSize({
            stitches:  result.calculated.motifWidthStitches,
            rows:      result.calculated.motifHeightRows,
            widthCm:   result.calculated.motifWidthCm  ?? 0,
            heightCm:  result.calculated.motifHeightCm ?? 0,
          })
        } else {
          setMotifSize(null)
        }

        if (type === 'blanket') {
          setBlanketDimensions({
            width:  result.defaults['width-cm']  || sizeMin,
            height: result.defaults['height-cm'] || sizeMax,
          })
        }
      } else if (result.errors?.length > 0) {
        if (type === 'blanket') onRevert()
        onError(result.errors.join(' '))
      }
    } catch (err) {
      console.error(`[usePatternCalculation] Failed to calculate ${type} pattern:`, err)
      if (type === 'blanket' && err instanceof Error && err.message.includes('Bad Request')) {
        onRevert()
        onError('The motif is too large for the current pattern dimensions. Please adjust the size or tension.')
      }
    }
  }

  // Debounced re-calculation for baby blanket
  useEffect(() => {
    if (currentPattern !== 'BabyBlanket' || loading) return
    const id = setTimeout(() => calculate('blanket'), 500)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knittingTensionMin, knittingTensionMax, sizeMin, sizeMax, currentPattern, loading, motifDimensions])

  // Debounced re-calculation for sweater
  useEffect(() => {
    if (currentPattern === 'BabyBlanket' || currentPattern === 'Hat' || loading) return
    const id = setTimeout(() => calculate('sweater'), 500)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knittingTensionMin, knittingTensionMax, chestSize, currentPattern, loading, motifDimensions])

  // Debounced re-calculation for hat
  useEffect(() => {
    if (currentPattern !== 'Hat' || loading) return
    const id = setTimeout(() => calculate('hat'), 500)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knittingTensionMin, knittingTensionMax, sizeMin, currentPattern, loading, motifDimensions])

  return { accordionSections, motifSize, blanketDimensions, calculate }
}
