// Generates a consistent avatar color based on name
// Same name always gets the same color

const PALETTES = [
  { bg: "#d1fae5", text: "#065f46" },  // emerald
  { bg: "#dbeafe", text: "#1e40af" },  // blue
  { bg: "#fce7f3", text: "#9d174d" },  // pink
  { bg: "#fef3c7", text: "#92400e" },  // amber
  { bg: "#ede9fe", text: "#5b21b6" },  // violet
  { bg: "#ccfbf1", text: "#0f766e" },  // teal
  { bg: "#fee2e2", text: "#991b1b" },  // red
  { bg: "#e0f2fe", text: "#0369a1" },  // sky
];

export function getAvatarColor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTES[Math.abs(hash) % PALETTES.length];
}

export function getInitial(name = "") {
  return name.trim().charAt(0).toUpperCase() || "?";
}