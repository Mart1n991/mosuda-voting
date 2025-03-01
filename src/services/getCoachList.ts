export const getCoachList = async ({ pageSize, pageNumber }: { pageSize: number; pageNumber: number }) => {
  const response = await fetch(`${process.env.MOSUDA_APP_COACH_LIST_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
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
