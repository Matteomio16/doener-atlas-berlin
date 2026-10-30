import { Rubik, Atkinson_Hyperlegible } from "next/font/google";

export const display = Rubik({ weight: ["700", "800", "900"], subsets: ["latin", "latin-ext"], variable: "--font-display" });
export const body = Atkinson_Hyperlegible({ weight: ["400", "700"], subsets: ["latin", "latin-ext"], variable: "--font-body" });
