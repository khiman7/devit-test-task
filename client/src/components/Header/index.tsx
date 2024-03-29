import { Grid, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';

export default function Header() {
  return (
    <Grid container component="header" sx={{ py: 3, px: 6 }}>
      <Link style={{ textDecoration: 'none' }} to={ROUTES.ROOT}>
        <Typography level="h3" fontWeight="bold">
          📰 RSS Parser
        </Typography>
      </Link>
    </Grid>
  );
}
