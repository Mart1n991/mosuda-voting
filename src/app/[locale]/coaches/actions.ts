"use server";

import { getCoachList } from "@/services/getCoachList";

export async function fetchCoaches(pageSize: number, pageNumber: number) {
  try {
    const coaches = await getCoachList({ pageSize, pageNumber });
    return { data: coaches, error: null };
  } catch (error) {
    console.error("Error fetching coaches:", error);
    return { data: null, error: "Failed to fetch coaches" };
  }
}
