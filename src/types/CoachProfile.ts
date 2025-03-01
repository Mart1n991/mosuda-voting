export interface CoachProfile {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  publicProfile: boolean;
  yearsOfExperience: number;
  youtubeLink: string;
  latitude: number;
  longitude: number;
  gender: number;
  placeName: string;
  pricePerHour: number | null;
  pricePerMonth: number;
  headline: string;
  participatedInCompetition: boolean;
  voteCount: number;
}
