"use server";

import { getCoachList } from "@/services/getCoachList";

export async function fetchCoaches(pageSize: number, pageNumber: number) {
  try {
    const response = await getCoachList({ pageSize, pageNumber });
    return { data: response, error: null };
  } catch (error) {
    console.error("Error fetching coaches:", error);
    return { data: null, error: "Failed to fetch coaches" };
  }
}
