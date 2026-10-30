import { Gloock, Schibsted_Grotesk } from "next/font/google";

export const display = Gloock({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-display" });
export const body = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-body" });
