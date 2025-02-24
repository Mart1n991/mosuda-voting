import { getCoachList } from "@/services/getCoachList";
import { CoachProfile } from "@/types/CoachProfile";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function CoachList({ coachList }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Zoznam trénerov</h1>
      <ul>
        {coachList && coachList.length > 0 ? (
          coachList.map((coach: CoachProfile) => <li key={coach.id}>{coach.name}</li>)
        ) : (
          <li>Žiadni tréneri nenájdení</li>
        )}
      </ul>
    </div>
  );
}

export const getServerSideProps = (async () => {
  const coachList = await getCoachList();

  return {
    props: {
      coachList,
    },
  };
}) satisfies GetServerSideProps<{ coachList: CoachProfile[] }>;
