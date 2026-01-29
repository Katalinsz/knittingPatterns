import motif1 from "../assets/motif1.jpg";
export const STAGE_WIDTH = 600;
export const STAGE_HEIGHT = 800;
export const STITCH_SIZE = 10;

export const PRESET_SIZES = {
  S: { width: 400, height: 500 },
  M: { width: 500, height: 600 },
  L: { width: 600, height: 700 },
  XL: { width: 700, height: 800 },
};

export const LOCAL_MOTIFS = [
  { id: "1", title: "Heart", imageUrl: motif1 },
];

export const PLACEHOLDER_SWEATER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='600' viewBox='0 0 500 600'%3E%3Crect fill='%23F3F4F6' width='500' height='600'/%3E%3Cpath fill='%23E5E7EB' d='M100,80 Q100,50 130,50 L370,50 Q400,50 400,80 L450,150 L450,600 L50,600 L50,150 Z'/%3E%3Cellipse cx='250' cy='150' rx='80' ry='60' fill='%23D1D5DB'/%3E%3Ctext x='250' y='320' font-size='20' fill='%239CA3AF' text-anchor='middle' font-family='Arial'%3ESweater Design Area%3C/text%3E%3C/svg%3E";
