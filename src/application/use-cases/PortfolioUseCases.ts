import { architectureReviewContent } from "@/content/site/architectureReview";
import { homeContent } from "@/content/site/home";

export class PortfolioUseCases {
  static getHomeContent() {
    return homeContent;
  }

  static getArchitectureReviewContent() {
    return architectureReviewContent;
  }
}
