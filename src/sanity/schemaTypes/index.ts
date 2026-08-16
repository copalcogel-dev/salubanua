import { postType } from "./post";
import { destinationType } from "./destination";
import { siteSettingsType } from "./siteSettings";
import { pageType } from "./page";
import { categoryType } from "./category";

export const schema = {
  types: [postType, destinationType, categoryType, pageType, siteSettingsType],
};
