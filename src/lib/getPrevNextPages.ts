
export default function getPrevNextPages(curPage : number, limit: number, totalCount:number) {
  const totalPages = Math.ceil(totalCount / limit)

  if (curPage === 0 && curPage + 3 <= totalPages) {
    const prevPage = null
    const nextPage = curPage +3
    return { prevPage, nextPage }
  }

  if (curPage +3 > totalPages) {
    const prevPage = curPage -3
    const nextPage = null
    return { prevPage, nextPage }
  }

  const prevPage = curPage - 3
  const nextPage = curPage + 3

  return {prevPage, nextPage}
}