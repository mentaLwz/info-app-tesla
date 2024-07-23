import Link from "next/link"

type Props = {
    page: number,
    prevPage: number | null,
    nextPage: number | null,
}

export default function Footer({ page, prevPage, nextPage }: Props) {

    if (!prevPage && !nextPage) return

    const pageNums: number[] = []
    if (prevPage && nextPage) {
        for (let i = prevPage + 1; i < nextPage; i++) {
            pageNums.push(i)
        }
    }

    const nextPageArea = nextPage
        ? (
            <Link href={`/results/${nextPage}`} className={!prevPage ? "mx-auto" : ""} >
                {!prevPage ? "more" : null} &gt;&gt;&gt;
            </Link>
        )
        : null

    const prevPageArea = prevPage
        ? (
            <>
                <Link href={`/results/${prevPage}`} className={!nextPage ? "mx-auto" : ""} >
                    &lt;&lt;&lt; {!nextPage ? "back" : null}
                </Link>

                {pageNums.map((num, i) => (
                    page && num === page
                        ? <span key={i}>{num}</span>
                        : (
                            <Link key={i} href={`/results/${num}`} className="underline"
                            >{num}</Link>
                        )
                ))}
            </>
        )
        : null

    return (
        <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">
            {prevPageArea}
            {nextPageArea}
        </footer>
    )
}