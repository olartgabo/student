import type { Sponsor } from "./types";

/** The seven AWS Student Builder Groups co-organizing the event. */
export const organizers = [
  {
    id: "sbg-ucb-la-paz",
    name: "AWS Student Builder Group UCB La Paz",
    logo: "/organizers/UCB - La Paz.svg",
    width: 2853,
    height: 2752,
  },
  {
    id: "sbg-uajms",
    name: "AWS Student Builder Group UAJMS",
    logo: "/organizers/UJAMS.svg",
    width: 1254,
    height: 1254,
  },
  {
    id: "sbg-umsa",
    name: "AWS Student Builder Group UMSA",
    logo: "/organizers/UMSA.png",
    width: 3000,
    height: 3000,
  },
  {
    id: "sbg-umss",
    name: "AWS Student Builder Group UMSS",
    logo: "/organizers/UMSS.png",
    width: 2128,
    height: 2128,
  },
  {
    id: "sbg-upb-cochabamba",
    name: "AWS Student Builder Group UPB Cochabamba",
    logo: "/organizers/UPB-CBBA.svg",
    width: 572,
    height: 572,
  },
  {
    id: "sbg-upb-la-paz",
    name: "AWS Student Builder Group UPB La Paz",
    logo: "/organizers/UPB-LaPaz.png",
    width: 3415,
    height: 3415,
  },
  {
    id: "sbg-univalle",
    name: "AWS Student Builder Group Univalle",
    logo: "/organizers/univalle.png",
    width: 1080,
    height: 1080,
  },
] as const satisfies readonly Sponsor[];
