export interface CoachProfile {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  publicProfile: boolean;
  verified: boolean;
  yearsOfExperience: number;
  youtubeLink: string;
  activeClients: number;
  latitude: number | null;
  longitude: number | null;
  placeName: string | null;
  oferringOnlineServices: boolean;
  oferringInPersonServices: boolean;
  weightLossSpecialist: boolean;
  muscleGainSpecialist: boolean;
  rehabilitationSpecialist: boolean;
  nutritionSpecialist: boolean;
  specialistInImprovingFitness: boolean;
  mentalCoaching: boolean;
  crossfitSpecialist: boolean;
  gender: number | null;
  pricePerHour: number | null;
  pricePerMonth: number | null;
  headline: string | null;
  totalReviews: number;
  totalRating: number;
  totalReviewsOfRating1: number;
  totalReviewsOfRating2: number;
  totalReviewsOfRating3: number;
  totalReviewsOfRating4: number;
  totalReviewsOfRating5: number;
  viewsInLast72Hours: number;
}

export interface CoachProfilesResponse {
  profiles: CoachProfile[];
  count: number;
}
