import type { Metadata } from "next";
import { Montserrat, Raleway, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Native Trees - Líderes en exportación de árboles autóctonos",
  description: "Somos exportadores de árboles autóctonos de Argentina. También contamos con especies del resto del mundo. ¡Embellecé tus espacios con ellas!",
  openGraph: {
    title: "Native Trees - Líderes en exportación de árboles autóctonos",
    description: "Somos exportadores de árboles autóctonos de Argentina. También contamos con especies del resto del mundo.",
    url: "https://www.nativetrees.com.ar",
    siteName: "Native Trees",
    locale: "es_AR",
    type: "website"
  },
  alternates: {
    languages: {
      "es-AR": "https://www.nativetrees.com.ar/",
      "en-US": "https://www.nativetrees.com.ar/en/"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.nativetrees.com.ar/#organization",
        "name": "Native Trees",
        "url": "https://www.nativetrees.com.ar",
        "telephone": "+54 9 11 3510-8014",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Benavídez 92",
          "addressLocality": "Benavídez",
          "addressRegion": "Provincia de Buenos Aires",
          "addressCountry": "AR"
        },
        "description": "Líderes en producción, provisión, exportación y trasplante de árboles autóctonos y palmeras en Argentina y el mundo.",
        "areaServed": ["Argentina", "Europa", "Asia", "Medio Oriente"],
        "priceRange": "$$$$"
      }
    ]
  };

  return (
    <html lang="es" className={`${montserrat.variable} ${raleway.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-raleway antialiased bg-white text-zinc-900 selection:bg-[#646945] selection:text-white">
        {children}
      </body>
    </html>
  );
}
