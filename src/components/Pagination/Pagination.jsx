import { observer } from 'mobx-react-lite';
import usersStore from '../../stores/users';
import './Pagination.css';

function Pagination() {
  const { page, limit, total } = usersStore;
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) {
      usersStore.setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      usersStore.setPage(page + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    usersStore.setPage(pageNum);
  };

  // Генерируем номера страниц (ограничим до 5 для простоты)
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        Предыдущая
      </button>
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageClick(pageNum)}
          className={page === pageNum ? 'active' : ''}
        >
          {pageNum}
        </button>
      ))}
      <button onClick={handleNext} disabled={page === totalPages}>
        Следующая
      </button>
      <span>
        Страница {page} из {totalPages}
      </span>
    </div>
  );
}

export default observer(Pagination);