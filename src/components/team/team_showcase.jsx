import { useContext } from "react";
import { TeamMember } from "./team_member";
import { TabContext } from "../../context/TabContext";
import { getTeamCardLabel } from "../../utils/candidateRoles";

const CORE_ROLE_ORDER = [
  "Convenor",
  "Vice-Convenor",
  "Head of Operations",
  "Technical Head",
  "Secretary",
  "Frame Head",
  "Reel Head",
  "Vivid Head",
  "Social Media Head",
];

const sortCoreMembersFirst = (members) =>
  [...members].sort((a, b) => Number(b.core === "Yes") - Number(a.core === "Yes"));

const sortCoreMembers = (members) =>
  [...members].sort((a, b) => {
    const aIndex = a.core === "Yes" ? CORE_ROLE_ORDER.indexOf(a.coreRole) : -1;
    const bIndex = b.core === "Yes" ? CORE_ROLE_ORDER.indexOf(b.coreRole) : -1;

    return (aIndex === -1 ? CORE_ROLE_ORDER.length : aIndex) -
      (bIndex === -1 ? CORE_ROLE_ORDER.length : bIndex);
  });

const isHighlightedMember = (candidate, activeItem) => {
  if (activeItem === "Core") {
    return ["Convenor", "Vice-Convenor"].includes(candidate.coreRole);
  }

  return (
    candidate.core === "Yes" &&
    candidate.coreRole === `${activeItem} Head`
  );
};

export function TeamShowcase() {
  const { candidates, activeItem, searchQuery } = useContext(TabContext);

  const matchingCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const coreCandidates = matchingCandidates.filter(
    (candidate) => candidate.core === "Yes" || !candidate.role,
  );

  const displayedCandidates =
    activeItem === "Core"
      ? sortCoreMembers(coreCandidates)
      : activeItem === "View all"
        ? sortCoreMembers(matchingCandidates)
        : sortCoreMembersFirst(
            matchingCandidates.filter((candidate) => candidate.role === activeItem),
          );

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayedCandidates.length > 0 ? (
          <div
            key={activeItem}
            className="member-grid-transition grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {displayedCandidates.map((candidate) => (
              <TeamMember
                key={candidate.id}
                name={candidate.name}
                role={getTeamCardLabel(candidate)}
                imageUrl={candidate.avatar}
                isHighlighted={isHighlightedMember(candidate, activeItem)}
                instagram={candidate.instagram}
                linkedin={candidate.linkedin}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No members to display.</p>
        )}
      </div>
    </div>
  );
}
