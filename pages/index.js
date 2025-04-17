import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sandhu CodesWear</title>
        <meta name="description" content="SandhuWear.com - Wear the Code" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <div className="">
        This is me
      </div>
    </div>
  );
}
