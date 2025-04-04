import { CoachProfile } from "@/types/CoachProfile";

export interface CoachListResponse {
  totalCount: number;
  profiles: CoachProfile[];
}

export interface GetCoachListParams {
  pageSize: number;
  pageNumber: number;
  search?: string;
}

export const getCoachList = async ({ pageSize, pageNumber, search }: GetCoachListParams): Promise<CoachListResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_MOSUDA_APP_ENDPOINT;
  const searchParam = search ? `&name=${encodeURIComponent(search)}` : "";
  const url = `${baseUrl}/coachProfileChallenge?pageSize=${pageSize}&pageNumber=${pageNumber}${searchParam}`;

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
