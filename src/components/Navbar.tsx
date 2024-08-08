import Link from "next/link";
import HeatMapButton from "./HeatMapButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 font-mono text-black">
    <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center p-4 font-bold max-w-6xl mx-auto text-black">
        <h1 className="text-2xl sm:text-3xl text-center whitespace-nowrap">
            <Link href="/">All about tesla</Link>
            
        </h1>
        <HeatMapButton />
    </nav>
</header>
  )
}