import "./globals.css";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InDevelopment from "@/components/InDevelopment";

const MAINTENANCE_MODE = false;
const constructionProgress = 70;
export const metadata = {
  title: "AuroraLabs",
  description: "Desarrollo web profesional para empresas y pymes.",
};

export default function RootLayout({ children }) {
  if (MAINTENANCE_MODE) {
    return (
      <html lang="es">
        <body>
          <Providers>
            <InDevelopment constructionProgress={constructionProgress} />
          </Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="es" className="scroll-smooth">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <GoogleAnalytics gaId="G-RJ8GT444P7" />
      </body>
    </html>
  );
}