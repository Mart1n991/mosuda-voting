import { CoachProfile } from "@/types/CoachProfile";

export const getCoachPlacements = (coaches: CoachProfile[]) => {
  return [...coaches]
    .sort((a, b) => b.voteCount - a.voteCount)
    .reduce<Record<string, number>>((acc, coach, idx) => {
      acc[coach.id] = idx + 1; // 1-based rank
      return acc;
    }, {});
};
