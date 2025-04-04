export const getCoachList = async ({ pageSize, pageNumber }: { pageSize: number; pageNumber: number }) => {
  const url = `${process.env.NEXT_PUBLIC_MOSUDA_APP_ENDPOINT}/coachProfileChallenge?pageSize=${pageSize}&pageNumber=${pageNumber}`;

  const response = await fetch(url, {
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
