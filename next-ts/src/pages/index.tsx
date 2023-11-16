import Head from "next/head";

// eslint-disable-next-line import/no-default-export
export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js</title>
        <meta name="description" content="Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-black text-3xl">Next.js</main>
    </>
  );
}
