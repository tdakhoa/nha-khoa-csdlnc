import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("../src/modules/Profile"), { ssr: false });

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <DynamicComponentWithNoSSR />
            </main>
        </div>
    );
}
