import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Headwinds from "./headwinds";

// now 100% SSR!
export default function Home() {
  return <Headwinds />;
}
