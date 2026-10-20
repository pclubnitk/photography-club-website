import axios from "axios";
import { API_URL } from "./api";

const getAvatarUrl = (url) => {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_URL}${url}`;
};

const mapCandidate = (candidate) => ({
  id: candidate.documentId || String(candidate.id),
  name: candidate.name || "Unknown Candidate",
  role: candidate.role || "",
  bio: candidate.bio || "",
  mail: candidate.email || "",
  instagram: candidate.instagram || "",
  linkedin: candidate.linkedin || "",
  avatar: getAvatarUrl(candidate.avatar?.url),
  core: candidate.core || "",
  coreRole: candidate.coreRole || "",
  photos: [],
});

export const getCandidates = async () => {
  const response = await axios.get(
    `${API_URL}/api/candidates?populate=avatar`,
  );

  return response.data.data.map(mapCandidate);
};
