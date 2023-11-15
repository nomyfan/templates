import Head from "next/head";

import { Person } from "@/components/Person";
import { withTRPC } from "@/trpc";

// eslint-disable-next-line import/no-default-export
export default withTRPC(function Home() {
  return (
    <>
      <Head>
        <title>Next.js</title>
        <meta name="description" content="Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Person />
    </>
  );
});
