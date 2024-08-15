import Link from "next/link";
import HeatMapButton from "./HeatMapButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 font-mono text-black bg-opacity-30 shadow-sm">
    <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center p-4 font-mono max-w-6xl mx-auto text-green-400">
        <h1 className="text-2xl sm:text-3xl text-left whitespace-nowrap">
            <Link href="/">All about Tesla</Link>
            
        </h1>
        <HeatMapButton />
    </nav>
</header>
  )
}