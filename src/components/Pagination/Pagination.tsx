interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          hasPrev
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <div className="flex items-center gap-2">
        <span className="text-gray-600">
          Página <span className="font-semibold">{currentPage}</span> de{' '}
          <span className="font-semibold">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          hasNext
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Página siguiente"
      >
        Siguiente →
      </button>
    </div>
  );
};