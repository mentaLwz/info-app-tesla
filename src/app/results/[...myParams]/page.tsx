import Gallery from "@/components/Gallery"
export const runtime = "edge";
type Props = {
    params: {
        myParams: (string | undefined)[]
    }
}


export function generateMetadata({ params: { myParams } }: Props) {

    const page = myParams?.[0] ?? "1"

    return {
        title: `Results for tesla - Page ${page}`
    }
}

export default function SearchResults({ params: { myParams } }: Props) {

    const page = parseInt(myParams?.[0] ?? "1")
    console.log("lwzdebug page from server too", page)
    return <Gallery page={page} />
}