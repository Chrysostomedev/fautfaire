import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Faut faire — Vie & Ambition",
    short_name: "Faut faire",
    description: "Organise ta vie, illumine ton ambition",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0E14",
    theme_color: "#f97316",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
