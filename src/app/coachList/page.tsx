import { getCoachList } from "@/services/getCoachList";
import { CoachProfilesResponse } from "@/types/CoachProfile";

export default async function CoachList() {
  const coachList: CoachProfilesResponse = await getCoachList();

  const { profiles } = coachList;

  return (
    <div>
      <h1>Zoznam trénerov</h1>
      <ul>
        {profiles ? (
          profiles.map((coachProfile) => <li key={coachProfile.id}>{coachProfile.name}</li>)
        ) : (
          <li>Žiadni tréneri nenájdení</li>
        )}
      </ul>
    </div>
  );
}
