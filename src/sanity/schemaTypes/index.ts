import { postType } from "./post";
import { destinationType } from "./destination";
import { siteSettingsType } from "./siteSettings";

export const schema = {
  types: [postType, destinationType, siteSettingsType],
};
