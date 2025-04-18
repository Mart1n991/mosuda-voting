import { ReactNode } from "react";

export type Prize = {
  id: string;
  title: ReactNode | string;
  description?: string;
  image: string;
  className?: string;
  isFirstPlace?: boolean;
  place: string;
};
