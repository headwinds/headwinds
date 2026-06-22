"use client";

import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "./mdx-components";

interface MDXLayoutProps {
  children: React.ReactNode;
}

export function MDXLayout({ children }: MDXLayoutProps) {
  const components = useMDXComponents({});

  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  );
}
