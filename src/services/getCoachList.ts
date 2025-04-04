import { CoachProfile } from "@/types/CoachProfile";

export interface CoachListResponse {
  totalCount: number;
  profiles: CoachProfile[];
}

export const getCoachList = async ({
  pageSize,
  pageNumber,
}: {
  pageSize: number;
  pageNumber: number;
}): Promise<CoachListResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_MOSUDA_APP_ENDPOINT;
  const url = `${baseUrl}/coachProfileChallenge?pageSize=${pageSize}&pageNumber=${pageNumber}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
