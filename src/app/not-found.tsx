import {StyledPaper} from '@components/Base';
import {HomeRounded} from '@mui/icons-material';
import {Button, Typography} from '@mui/material';

export default function NotFound() {
  return (
    <StyledPaper
      sx={{
        width: {xs: '90%', md: '40%', lg: '35%'},
        maxWidth: '480px',
        margin: 'auto',
        px: 3,
        py: 2,
        textAlign: 'center',
      }}>
      <Typography variant="h2" sx={{mt: 1.5}}>
        Page Not Found
      </Typography>
      <Typography sx={{my: 1}}>The page you are looking for may have been removed or relocated.</Typography>
      <Button variant="contained" color="primary" href="/" startIcon={<HomeRounded />}>
        Go to Home
      </Button>
    </StyledPaper>
  );
}
