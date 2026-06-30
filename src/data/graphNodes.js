// Graph nodes: corridor waypoints + store entrance positions
// x, y are percentages of the floor map image dimensions
// floor: 1/2/3/4 | 'esc' = escalator (connects multiple floors)

export const graphNodes = [
  // ── Floor 1 ───────────────────────────────────────────────────────
  { id: 1,   floor: 1, x: 28, y: 47 },  // Reserved
  { id: 2,   floor: 1, x: 33, y: 53 },  // corridor
  { id: 3,   floor: 1, x: 32, y: 63 },  // Walker
  { id: 4,   floor: 1, x: 39, y: 60 },  // corridor junction
  { id: 5,   floor: 1, x: 44, y: 58 },  // corridor
  { id: 6,   floor: 1, x: 49, y: 57 },  // escalator junction floor 1
  { id: 7,   floor: 1, x: 52, y: 57 },  // Nike
  { id: 8,   floor: 1, x: 53, y: 65 },  // Gap
  { id: 9,   floor: 1, x: 52, y: 70 },  // corridor
  { id: 10,  floor: 1, x: 50, y: 75 },  // Arber
  { id: 11,  floor: 1, x: 55, y: 73 },  // Koton
  { id: 12,  floor: 1, x: 57, y: 57 },  // corridor
  { id: 13,  floor: 1, x: 63, y: 55 },  // corridor
  { id: 14,  floor: 1, x: 70, y: 52 },  // corridor
  { id: 15,  floor: 1, x: 73, y: 50 },  // Super Coffee
  { id: 16,  floor: 1, x: 79, y: 53 },  // corridor
  { id: 17,  floor: 1, x: 87, y: 56 },  // SM.CAR
  { id: 18,  floor: 1, x: 82, y: 63 },  // Автоентерпрайз

  // ── Floor 2 ───────────────────────────────────────────────────────
  { id: 101, floor: 2, x: 22, y: 51 },  // Zara
  { id: 102, floor: 2, x: 27, y: 47 },  // corridor
  { id: 103, floor: 2, x: 28, y: 37 },  // Intertop
  { id: 104, floor: 2, x: 34, y: 52 },  // corridor
  { id: 105, floor: 2, x: 36, y: 53 },  // Guess
  { id: 106, floor: 2, x: 41, y: 53 },  // escalator junction floor 2
  { id: 107, floor: 2, x: 40, y: 58 },  // Fox Lingerie
  { id: 108, floor: 2, x: 44, y: 52 },  // Jasmine
  { id: 109, floor: 2, x: 37, y: 58 },  // corridor
  { id: 110, floor: 2, x: 38, y: 63 },  // Cropp
  { id: 111, floor: 2, x: 43, y: 68 },  // Usupso
  { id: 112, floor: 2, x: 49, y: 53 },  // corridor
  { id: 113, floor: 2, x: 56, y: 56 },  // Sharman
  { id: 114, floor: 2, x: 55, y: 64 },  // Foxtrot
  { id: 115, floor: 2, x: 62, y: 54 },  // corridor
  { id: 116, floor: 2, x: 63, y: 51 },  // Top Line
  { id: 117, floor: 2, x: 63, y: 60 },  // CCC Ukraina
  { id: 118, floor: 2, x: 69, y: 53 },  // corridor
  { id: 119, floor: 2, x: 69, y: 51 },  // Farmacia
  { id: 120, floor: 2, x: 73, y: 57 },  // Sinsay
  { id: 121, floor: 2, x: 79, y: 53 },  // corridor
  { id: 122, floor: 2, x: 83, y: 48 },  // Zugo Home
  { id: 123, floor: 2, x: 84, y: 55 },  // Novus

  // ── Floor 3 ───────────────────────────────────────────────────────
  { id: 201, floor: 3, x: 36, y: 52 },  // corridor
  { id: 202, floor: 3, x: 42, y: 54 },  // corridor
  { id: 203, floor: 3, x: 45, y: 53 },  // escalator junction floor 3
  { id: 204, floor: 3, x: 48, y: 58 },  // Valliza
  { id: 205, floor: 3, x: 50, y: 63 },  // corridor
  { id: 206, floor: 3, x: 56, y: 73 },  // Пузата Хата
  { id: 207, floor: 3, x: 52, y: 60 },  // McDonald's
  { id: 208, floor: 3, x: 50, y: 65 },  // KFC

  // ── Floor 4 ───────────────────────────────────────────────────────
  { id: 301, floor: 4, x: 25, y: 42 },  // corridor
  { id: 302, floor: 4, x: 27, y: 48 },  // Ігроленд
  { id: 303, floor: 4, x: 35, y: 42 },  // corridor
  { id: 306, floor: 4, x: 40, y: 44 },  // escalator junction floor 4
]
