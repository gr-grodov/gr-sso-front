import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

interface AdminOAuthUsersPaginationProps {
  page: number,
  totalPages: number,
  onChangePage: (page: number) => void
}

export function AdminOAuthUsersPagination({
  page,
  totalPages,
  onChangePage
}: AdminOAuthUsersPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }
  const {t} = useTranslation("common", {keyPrefix: "pagination"});
  const pages = getPaginationPages(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text={t("prev_title")}
            onClick={(event) => {
              event.preventDefault();
              if (page > 0) {
                onChangePage(page - 1);
              }
            }}
            aria-disabled={page === 0}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          />
        </PaginationItem>

        {pages.map((pageNumber, index) => {
          const previousPage = pages.at(index - 1);
          const showEllipsis = previousPage !== undefined && pageNumber - previousPage > 1;

          return (
            <Fragment key={pageNumber}>
              {showEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={page === pageNumber}
                  onClick={(event) => {
                    event.preventDefault();
                    onChangePage(pageNumber);
                  }}
                >
                  {pageNumber + 1}
                </PaginationLink>
              </PaginationItem>
            </Fragment>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            text={t("next_title")}
            onClick={(event) => {
              event.preventDefault();
              if (page < totalPages - 1) {
                onChangePage(page + 1);
              }
            }}
            aria-disabled={page === totalPages - 1}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getPaginationPages(currentPage: number,totalPages: number,): number[] {
  const pages: number[] = [];

  for (let i = 0; i < totalPages; i++) {
    if (i === 0 || i === totalPages - 1 ||Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    }
  }

  return pages;
}
