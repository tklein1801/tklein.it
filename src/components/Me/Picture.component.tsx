import {StyledImage} from '@components/Base';
import {type SxProps, type Theme} from '@mui/material';
import Avatar from '@/../public/me.jpg';

export const Picture: React.FC<{sx?: SxProps<Theme>}> = ({sx}) => (
  <StyledImage
    src={Avatar}
    alt="Picture of mine"
    sx={{
      width: '75%',
      height: 'auto',
      aspectRatio: '1/1',
      opacity: 0.4,
      transition: 'all 250ms',
      boxShadow: '0 0 20px #000',
      ':hover': {
        opacity: 1,
        transform: 'rotate(3deg) scale(1.05)',
      },
      ...sx,
    }}
    placeholder="blur"
    priority
  />
);
