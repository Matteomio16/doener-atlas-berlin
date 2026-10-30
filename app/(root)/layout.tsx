import "../globals.css";
import { display, body } from "@/lib/fonts";

export const metadata = { title: "Döner Atlas Berlin", icons: "/favicon.svg" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
