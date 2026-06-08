import { architectureReviewContent } from "@/content/site/architectureReview";
import { architectureReviewContentEn } from "@/content/site/architectureReview.en";
import { homeContent } from "@/content/site/home";
import { homeContentEn } from "@/content/site/home.en";

export class PortfolioUseCases {
  static getHomeContent(locale = "es") {
    if (locale === "en") {
      return homeContentEn;
    }
    return homeContent;
  }

  static getArchitectureReviewContent(locale = "es") {
    if (locale === "en") {
      return architectureReviewContentEn;
    }
    return architectureReviewContent;
  }
}
