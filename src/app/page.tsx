
import Gallery from "@/components/Gallery";

export function generateMetadata() {
  return {
    title: `Results for tesla - Page 1`
  }
}

export const revalidate = 0; 

export default async function Home() {
  console.log("lwzdebug home page from server")
  return (
    <Gallery page={1}></Gallery>
  );
}
