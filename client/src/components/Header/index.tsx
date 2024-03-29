import { Grid, Typography } from '@mui/joy';

export default function Header() {
  return (
    <Grid container component="header" sx={{ py: 3, px: 6 }}>
      <Typography level="h3" fontWeight="bold">
        📰 RSS Parser
      </Typography>
    </Grid>
  );
}
