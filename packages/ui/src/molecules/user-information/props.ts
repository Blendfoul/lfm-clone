export type UserInfoProps = {
  name: string;
  team: string;
  avatar: string;
  origin: string;
  ratingBySim: {
    rating: number;
    sim_id: number;
    name: string;
    logo_url: string;
    license: string;
    division: number;
    ranked_races: number;
  }[];
  license: string;
  safetyRating: string;
};
