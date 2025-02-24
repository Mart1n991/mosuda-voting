export const getCoachList = async () => {
  const response = await fetch(process.env.MOSUDA_APP_COACH_LIST_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageSize: 100,
      pageNumber: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
