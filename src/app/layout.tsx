import type { Metadata } from "next"; 
import "./globals.css"; 
 
export const metadata: Metadata = {
  title: "WEDDING AFIFAH DAN HAIDAR",
  description: "Undangan pernikahan digital untuk pernikahan Afifah & Haidar pada tanggal 23 November 2024. Temukan informasi lengkap tentang lokasi, waktu acara. Hadirkan kebahagiaan dengan berbagi momen spesial ini bersama kami!",
  icons: {
    icon: "/favicon.jpeg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.jpeg" />
      </head>
      <body
        className={` antialiased`}
      >
        {children}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </body>
    </html>
  );
}
