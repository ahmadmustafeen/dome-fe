import { AppButton } from "../common";

interface iPagination {
  currentPage: number;
  totalPage: number;
  changePage: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPage, changePage }: iPagination) => {
  const handleIncrement = (updatedPage: number) => {
    if (totalPage < updatedPage) {
      return
    }
    changePage(updatedPage)
  }
  const handleDecrement = (updatedPage: number) => {
    if (updatedPage < 1) {
      return
    }
    changePage(updatedPage)
  }
  return <div className="text-black w-full mx-auto">
    <div className="flex gap-x-2 justify-center items-center">
      <AppButton title="Previous" onClick={() => handleDecrement(currentPage - 1)} variant="secondary" disabled={currentPage === 1} />
      Showing {currentPage} out of {totalPage}
      <AppButton title="Next" onClick={() => handleIncrement(currentPage + 1)} variant="secondary" disabled={currentPage === totalPage} />
    </div>
  </div>
}
