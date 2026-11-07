export const dynamic = 'force-dynamic';

import {Box, Grid, Typography} from '@mui/material';
import {Heading, Link} from '@components/Base';
import {Picture} from '@components/Me';
import {SuspenseProjectWrapper} from '@components/Project';
import {Timeline} from '@components/Timeline/Timeline';
import {config} from '@/config';
import {CommitHistoryWrapper} from '@components/Timeline/CommitHistory';

export default function Home() {
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Grid container spacing={3}>
          <Grid container size={{xs: 12, md: 8}} order={{xs: 1, md: 0}}>
            <Grid size={12}>
              <Heading size="large">About me</Heading>
              <Typography>
                {config.about.map((paragraph, index) => (
                  <span key={index}>
                    {paragraph.map(part =>
                      part.href ? (
                        <Link key={part.text} href={part.href} target="_blank">
                          {part.text}
                        </Link>
                      ) : (
                        part.text
                      ),
                    )}
                    <br /> <br />
                  </span>
                ))}
              </Typography>

              {/* <BlockQuote>
                Let's dive into the world of software development together and create something amazing!
              </BlockQuote> */}
            </Grid>

            <Grid size={12}>
              <Heading size="medium">I've worked with...</Heading>
            </Grid>

            <Grid container size={{xs: 12, md: 6}} spacing={0} sx={{height: 'fit-content'}}>
              <Grid size={12}>
                <Heading size="small">Languages</Heading>
              </Grid>
              {config.workedWith.languages.map(lang => (
                <Grid key={lang.replace(' ', '').toLowerCase()} size={6}>
                  <Typography sx={{':hover': {color: 'primary.main'}}}>{lang}</Typography>
                </Grid>
              ))}
            </Grid>

            <Grid container size={{xs: 12, md: 6}} spacing={0} sx={{height: 'fit-content'}}>
              <Grid size={12}>
                <Heading size="small">Technologies</Heading>
              </Grid>
              {config.workedWith.technologies.map(lang => (
                <Grid key={lang.replace(' ', '').toLowerCase()} size={6}>
                  <Typography sx={{':hover': {color: 'primary.main'}}}>{lang}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{xs: 12, md: 4}} order={{xs: 0, md: 1}}>
            <Box sx={{display: 'flex', width: '100%', height: '100%'}}>
              <Picture sx={{m: 'auto', width: {xs: '65%', md: '75%'}}} />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={12}>
          <Heading size="large">My experience</Heading>
        </Grid>
        <Timeline events={config.experience.events} />
      </Grid>

      <Grid size={12}>
        <Heading size="large">Projects</Heading>
        <SuspenseProjectWrapper />
      </Grid>
    </Grid>
  );
}
