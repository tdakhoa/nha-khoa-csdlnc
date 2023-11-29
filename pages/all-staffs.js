import React from "react";
import Head from "next/head";
import AllStaffs from "../src/modules/AllStaffs";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <AllStaffs />
            </main>
        </div>
    );
}
