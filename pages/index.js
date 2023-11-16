import Head from "next/head";
import { Inter } from "@next/font/google";
import QRCodeGenerator from "../components/QRCodeGenerator";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="QR code generator made by OleKoder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>QR Code Generator</h1>
        <QRCodeGenerator />
      </div>
    </>
  );
}
