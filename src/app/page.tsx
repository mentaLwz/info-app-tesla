
import Gallery from "@/components/Gallery";

export function generateMetadata() {
  return {
    title: `Results for tesla - Page 1`
  }
}

export default function Home() {
  return (
    <Gallery page={1}></Gallery>
  );
}
