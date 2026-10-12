import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alsadiquie.com"),
  title: "Al Sadiquie Restaurant | Royal Dining, Biryani & Mughlai Specialties",
  description:
    "Experience the royal culinary heritage of Al Sadiquie Restaurant. Authentic slow-cooked Awadhi Dum Biryani, succulent charcoal kebabs, and rich gravies in a luxurious white marble & fluted gold ambience.",
  keywords: [
    "Al Sadiquie Restaurant",
    "Al Siddiquie",
    "Fine Dining Restaurant",
    "Royal Mughlai Biryani",
    "Halal Restaurant",
    "Charcoal Kebabs",
    "Table Reservation",
  ],
  openGraph: {
    title: "Al Sadiquie Restaurant | Royal Heritage Fine Dining",
    description:
      "Authentic Awadhi Biryani, charcoal grills, and slow-simmered handi gravies served in regal elegance.",
    images: ["/images/restaurant-sign.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-white text-stone-900 selection:bg-amber-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
