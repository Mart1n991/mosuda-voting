import { truncate } from "lodash";

export const truncateText = (text: string, length: number) => {
  return truncate(text, { length });
};
