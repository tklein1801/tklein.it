'use client';

import React from 'react';
import {Box, Grid, Paper, Typography, Link} from '@mui/material';
import {StarRounded, RestaurantRounded} from '@mui/icons-material';
import {Badge} from '@components/Base';

export type TProjectProps = {
  repositoryUrl: string;
  repositoryName: string;
  repositoryDescription: string;
  repositoryLanguage: string;
  repositoryLanguageColor: string;
  repositoryStars: number;
  repositoryForks: number;
};

export const Project: React.FC<TProjectProps> = ({
  repositoryUrl,
  repositoryName,
  repositoryDescription,
  repositoryLanguage,
  repositoryLanguageColor,
  repositoryStars,
  repositoryForks,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: 'borderColor .2s',
        border: theme => `2px solid ${theme.palette.divider}`,
        borderRadius: theme => `${theme.shape.borderRadius}px`,
        p: 2,
        ':hover': {
          borderColor: 'primary.main',
          backgroundColor: 'background.paper',
        },
        ':hover > a': {
          color: 'primary.main',
        },
      }}>
      <Link
        variant="subtitle1"
        sx={{
          transition: 'color .2s',
          mb: 1,
          fontWeight: '500',
          color: 'text.primary',
          textDecoration: 'none',
        }}
        href={repositoryUrl}
        target="_blank"
        data-umami-event="click-project-link"
        data-umami-event-project={repositoryName}
        data-umami-event-href={repositoryUrl}>
        {repositoryName}
      </Link>

      <Typography
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
        }}>
        {repositoryDescription ?? 'No description'}
      </Typography>

      <Grid container columnSpacing={2} sx={{mt: 1}}>
        <Grid item xs={6} md={5}>
          <Badge>
            <Typography variant="body2" fontWeight={600}>
              {repositoryLanguage}
            </Typography>
          </Badge>
        </Grid>
        {[
          {
            icon: <StarRounded />,
            value: repositoryStars,
          },
          {
            icon: <RestaurantRounded />,
            value: repositoryForks,
          },
        ].map(({value, icon}, index) => (
          <Grid key={index} item xs={3} md={3.5}>
            <Box sx={{display: 'flex', height: '100%', alignItems: 'center'}}>
              <Typography variant="body2" sx={{display: 'flex', alignItems: 'center', fontSize: '105%'}}>
                {React.isValidElement(icon) &&
                  React.cloneElement(icon, {
                    // @ts-ignore
                    sx: {
                      fontSize: 'inherit',
                      mr: 0.5,
                    },
                  })}{' '}
                {value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
