"use client";

import { Row } from "cross-country";
import Link from "next/link";

const Nav = () => { 
  return (
    <Row customStyle={{ marginBottom: 20, fontSize: 12, color: 'gray', gap: 8 }}>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/journal">Journal</Link>
      <Link href="/wishlist">Wishlist</Link>
      <Link href="/contact">Contact</Link>
    </Row>
  );
} 
export default Nav;