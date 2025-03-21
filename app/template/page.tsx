"use client";
import HeadwindsSidequest from "@/components/headwinds-sidequest";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 w-full flex flex-col sm:flex-row items-center justify-between px-4 gap-4 sm:gap-0">
        <h1>Header</h1>
        <nav>Navigation</nav>
      </header>
      <div className="row-start-2 w-full h-full grid grid-cols-1 sm:grid-cols-[250px_1fr] grid-rows-[auto_1fr] sm:grid-rows-1">
        <aside className="bg-gray-100 p-4 sm:h-full h-[40px]">Sidebar</aside>
        <main className="p-4 col-span-1 sm:col-start-2 h-full">
          <HeadwindsSidequest />
        </main>
      </div>
      <footer className="row-start-3 w-full text-center">Footer</footer>
    </div>
  );
}
