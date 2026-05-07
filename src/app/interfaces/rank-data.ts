export interface RankData {
  rank: { decimal: number; frag: number };
  totalReviewers: number;
  ratingDistribution: { [key: number]: string };
}
