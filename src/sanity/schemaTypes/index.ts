import { postType } from "./post";
import { destinationType } from "./destination";
import { homeCardType } from "./homeCard";
import { siteSettingsType } from "./siteSettings";
import { pageType } from "./page";
import { categoryType } from "./category";

export const schema = {
  types: [
    postType,
    destinationType,
    homeCardType,
    categoryType,
    pageType,
    siteSettingsType,
  ],
};
