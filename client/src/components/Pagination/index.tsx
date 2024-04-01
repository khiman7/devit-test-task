import { Box, ButtonGroup, Button } from '@mui/joy';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? 'solid' : 'outlined'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <ButtonGroup color="primary" variant="outlined">
        {renderPageButtons()}
      </ButtonGroup>
    </Box>
  );
}
