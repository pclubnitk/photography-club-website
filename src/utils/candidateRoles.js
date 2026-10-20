const MEMBER_POSITIONS = {
  Frame: "Frame Member",
  Grid: "Grid Member",
  Vivid: "Vivid Member",
  Reel: "Reel Member",
  "Social Media": "Social Media Member",
};

const SECTION_LABELS = {
  Frame: "Frame",
  Grid: "Grid",
  Vivid: "Vivid",
  Reel: "Reel",
  "Social Media": "Social Media",
};

export const getProfilePosition = (candidate) =>
  (candidate.core === "Yes" && candidate.coreRole) ||
  MEMBER_POSITIONS[candidate.role] ||
  "Core Member";

export const getTeamCardLabel = (candidate) =>
  (candidate.core === "Yes" && candidate.coreRole) ||
  SECTION_LABELS[candidate.role] ||
  "Core";
