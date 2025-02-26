import localFont from "next/font/local";

export const lexend = localFont({
  src: [
    {
      path: "./Lexend-ExtraLight.ttf",
      weight: "200",
      style: "extra-light",
    },
    {
      path: "./Lexend-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Lexend-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-lexend",
});
