export interface SweaterSize {
  label: string
  bodyWidth: number  // cm
  bodyLength: number // cm
}

/** Index matches the chestSize slider value (0 = XS … 5 = XXL). */
export const SWEATER_SIZES: SweaterSize[] = [
  { label: 'XS',  bodyWidth: 48, bodyLength: 64 },
  { label: 'S',   bodyWidth: 52, bodyLength: 67 },
  { label: 'M',   bodyWidth: 56, bodyLength: 70 },
  { label: 'L',   bodyWidth: 62, bodyLength: 73 },
  { label: 'XL',  bodyWidth: 68, bodyLength: 76 },
  { label: 'XXL', bodyWidth: 74, bodyLength: 79 },
]
