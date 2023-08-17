import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-slate-800 text-slate-50">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Experience the thrilling game of set like never before! Dive into our single-player mode or challenge your friends in real-time multiplayer battles. Get started quickly with our comprehensive how-to-play guide. Join the fun now!"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Set Multiplayer | Play Real-time with Friends"
        />
        <meta
          property="og:description"
          content="Experience the thrilling game of set in real-time! Play solo or team up with friends. Chat, strategize, and learn with our detailed guide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://setmultiplayer.com" />
        <meta property="og:site_name" content="Set Multiplayer" />

        {/* Other meta tags */}
        <meta
          name="keywords"
          content="set game, multiplayer, real-time, card game, strategy, next.js, chat room, how to play set"
        />
        <meta name="author" content="Jacob Rosenthal" />
        <meta name="robots" content="index, follow" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Icons */}
        <link rel="icon" href="/favicon/favicon32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon/favicon128x128.png" sizes="128x128" />
        <link rel="icon" href="/favicon/favicon256x256.png" sizes="256x256" />
        <link rel="icon" href="/favicon/favicon512x512.png" sizes="512x512" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
