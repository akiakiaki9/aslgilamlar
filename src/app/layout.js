import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ASL GILAM - Фабричные ковры в Бухаре | Магазин ковров от производителей",
  description: "ASL GILAM - широкий выбор фабричных ковров в Бухаре. ✓ Прямые поставки с заводов ✓ Доступные цены ✓ Ковры различных размеров и дизайнов ✓ Доставка по Узбекистану",
  keywords: "ковры Бухара, фабричные ковры, ASL GILAM, магазин ковров Бухара, ковры от производителей, турецкие ковры, персидские ковры, ковры в Бухаре, ковровые покрытия",
  authors: [{ name: "ASL GILAM", url: "https://aslgilamlarbukhara.uz" }],
  openGraph: {
    title: "ASL GILAM - Фабричные ковры в Бухаре",
    description: "Большой выбор фабричных ковров в Бухаре. Прямые поставки с заводов, доступные цены, разнообразие дизайнов и размеров.",
    url: "https://aslgilamlarbukhara.uz",
    siteName: "ASL GILAM",
    locale: "ru_UZ",
    type: "website",
    images: [
      {
        url: "https://aslgilamlarbukhara.uz/images/logo.png",
        width: 1200,
        height: 630,
        alt: "ASL GILAM - Фабричные ковры в Бухаре",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "home goods",
};

// ✅ ВЫНЕСЕНО В ОТДЕЛЬНЫЙ ЭКСПОРТ viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#b22222",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <meta name="geo.region" content="UZ-BU" />
        <meta name="geo.placename" content="Bukhara, Uzbekistan" />
        <meta name="geo.position" content="39.76808;64.45594" />
        <meta name="ICBM" content="39.76808, 64.45594" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Yandex Webmaster */}
        <meta name="yandex-verification" content="ваш_код_верификации" />

        {/* Google Search Console */}
        <meta name="google-site-verification" content="ваш_код_верификации" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}