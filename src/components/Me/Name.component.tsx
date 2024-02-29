import {Typography, type TypographyProps} from '@mui/material';

export type TNameProps = TypographyProps;

export const Name: React.FC<TNameProps> = ({...props}) => {
  return (
    <Typography variant="h2" fontWeight="bold" {...props}>
      Thorben Klein
    </Typography>
  );
};
