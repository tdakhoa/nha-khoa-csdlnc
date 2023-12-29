import React, { useState } from "react";
import Head from "next/head";
import QuanLyChiDinh from "../src/modules/QuanLyChiDinh";

export default function HomePage() {
  const [appointment, setAppointment] = useState([]);
  return (
    <div>
      <Head>
        <title>Nha Khoa</title>
        <link rel="icon" href="/Logo.png" />
      </Head>

      <main>
        <QuanLyChiDinh />
      </main>
    </div>
  );
}
