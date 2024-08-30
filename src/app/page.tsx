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
    <div className="flex justify-center items-center">
      <div className="w-full max-w-max px-1">
        <Gallery page={1} />
      </div>
    </div>
  );
}
