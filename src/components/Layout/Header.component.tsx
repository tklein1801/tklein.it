'use client';

import {Box} from '@mui/material';
import {Link} from '@components/Base';

export const Header = () => {
  return (
    <Box
      sx={{
        py: 8,
        backgroundImage: 'url(/header.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
      }}>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', columnGap: theme => theme.spacing(2)}}>
        {[
          {text: 'About me', href: '#about-me'},
          {text: 'My experience', href: '#my-experience'},
          {text: 'Projects', href: '#projects'},
        ].map(({text, href}) => (
          <Link key={href} variant="h6" href={href} data-umami-event="click-header-link" data-umami-event-href={href}>
            {text}
          </Link>
        ))}
      </Box>
    </Box>
  );
};
