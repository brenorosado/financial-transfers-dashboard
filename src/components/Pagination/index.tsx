import * as S from "./styles";

const getSiblingPages = (
  currentPage: number,
  inferiorLimit: number,
  superiorLimit: number,
) => {
  let start = currentPage - 1;

  if (currentPage === inferiorLimit) start = inferiorLimit;
  if (currentPage === superiorLimit) start = superiorLimit - 2;

  return [start, start + 1, start + 2];
};

type PaginationsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationsProps) => {
  const pagesToShow = getSiblingPages(currentPage, 1, totalPages);

  return (
    <S.PaginationContainer>
      {!pagesToShow.includes(1) && (
        <>
          <S.PageButton selected={false} onClick={() => onPageChange(1)}>
            1
          </S.PageButton>
          <span>...</span>
        </>
      )}
      {pagesToShow.map((page) => (
        <S.PageButton
          key={page}
          selected={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </S.PageButton>
      ))}
      {!pagesToShow.includes(totalPages) && (
        <>
          <span>...</span>
          <S.PageButton
            selected={false}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </S.PageButton>
        </>
      )}
    </S.PaginationContainer>
  );
};
