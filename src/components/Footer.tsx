import Link from "next/link"

type Props = {
    page: number,
    prevPage: number | null,
    nextPage: number | null,
}

export default function Footer({ page, prevPage, nextPage }: Props) {

    console.log("lwzdebug", prevPage, nextPage)

    if (!prevPage && !nextPage) return

    const pageNums: number[] = []
    if (prevPage && nextPage) {
        for (let i = prevPage + 1; i < nextPage; i++) {
            pageNums.push(i)
        }
    }

    if (!prevPage) {
        for (let i = 1; i <= 5 ; i++) {
            pageNums.push(i)
        }
    }


    const nextPageArea = nextPage
        ? (
            <Link href={`/results/${nextPage}`} className={!prevPage ? "mx-auto" : ""} > &gt;&gt;&gt;
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
        : (
            <>
            {pageNums.map((num, i) => (
                page && num === page
                    ? <span key={i}>{num}</span>
                    : (
                        <Link key={i} href={`/results/${num}`} className="underline"
                        >&nbsp;{num}&nbsp;</Link>
                    )
                ))}
            </>
        )

        console.log(prevPageArea)
        console.log(nextPageArea)

    return (
        <footer className="flex flex-row justify-around items-center px-2 py-4 font-bold w-60 mx-auto">
            {prevPageArea}
            {nextPageArea}
        </footer>
    )
}