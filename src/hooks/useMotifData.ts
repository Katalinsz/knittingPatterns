import { useState, useEffect } from 'react'

export interface MotifDimensions {
  width: number
  height: number
}

export interface UseMotifDataReturn {
  /** Pattern type read from the `?pattern=` URL param (e.g. "BabyBlanket", "Hat", "Sweater"). */
  currentPattern: string
  motifId: string | null
  motifImageUrl: string | null
  motifDimensions: MotifDimensions | null
}

/**
 * Reads the `pattern` and `motifId` URL parameters on mount, then fetches
 * the motif JSON + image URL from the CDN.
 */
export function useMotifData(): UseMotifDataReturn {
  // Read URL params once at mount — initialised directly to avoid setState-in-effect.
  const [currentPattern] = useState(
    () => new URLSearchParams(window.location.search).get('pattern') ?? 'BabyBlanket'
  )
  const [motifId] = useState(
    () => new URLSearchParams(window.location.search).get('motifId')
  )
  const [motifImageUrl, setMotifImageUrl] = useState<string | null>(null)
  const [motifDimensions, setMotifDimensions] = useState<MotifDimensions | null>(null)

  useEffect(() => {
    const id = motifId
    if (!id) return

    ;(async () => {
      try {
        const res = await fetch(`https://assets.knittedforyou.com/motif/${id}.json`)
        if (res.ok) {
          const data = await res.json()
          if (data.width && data.height) {
            setMotifDimensions({ width: data.width, height: data.height })
          }
          setMotifImageUrl(`https://assets.knittedforyou.com/motif/${id}.png`)
        } else {
          console.warn(`[useMotifData] Failed to fetch motif data for ID: ${id}`)
        }
      } catch (err) {
        console.error('[useMotifData] Error fetching motif data:', err)
      }
    })()
  }, [motifId])

  return { currentPattern, motifId, motifImageUrl, motifDimensions }
}
