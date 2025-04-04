export const getCoachDetail = async (coachId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOSUDA_APP_ENDPOINT}/coachProfileChallenge/${coachId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
