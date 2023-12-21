import React from "react";
import Head from "next/head";
import ThongTinChiTiet from "../../../src/modules/ThongTinChiTiet";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Nha Khoa</title>
                <link rel="icon" href="/Logo.png" />
            </Head>

            <main>
                <ThongTinChiTiet />
            </main>
        </div>
    );
}
