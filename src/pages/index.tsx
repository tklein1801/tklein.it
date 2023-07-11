import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import {
  StockService,
  StockWrapper,
  AchievementService,
  ProjectService,
  CommitHistory,
  CommitHistoryService,
  Subheading,
  TimelineContainer,
  Section,
  Heading,
  Link,
  SkillContainer,
  ProjectContainer,
  AchievementContainer,
  Achievement,
} from '@/components';
import style from '@/styles/Home.module.css';
import MeJpg from '@public//me.jpeg';

export type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home({ stocks, achievements, projects, commits }: HomeProps) {
  return (
    <React.Fragment>
      <StockWrapper className={style.ticker} stocks={stocks} />

      <Section id="about-me">
        <div className={style.row}>
          <div className={style.profileInformation}>
            <Heading>About me</Heading>
            <p>
              Greetings! I'm a budding software developer, currently undergoing my 3-year apprenticeship @{' '}
              <Link href="https://tchibo-karriere.de">Tchibo GmbH</Link>. I'm fascinated by the world of programming and
              all things tech-related, and I'm currently exploring the exciting realm of{' '}
              <Link href="https://sap.com">SAP</Link> development. If you're curious to know more about my past projects
              and endeavors, feel free to check out my portfolio on this website! <br />
              <br />
              Let's dive into the world of software development together and create something amazing!
            </p>

            {/* <p>
                  Hi! I'm just a little apprentice @ <Link href="https://tchibo-karriere.de">Tchibo GmbH</Link> who's on
                  his way to becoming an software developer, dealing with programming and other things (currently I'm
                  taking a look into the <Link href="https://sap.com">SAP</Link> development environment). On this
                  website you can have a look at projects & other stuff I've made in the past...
                </p> */}

            <SkillContainer />

            <div style={{ marginTop: '1rem' }}>
              <Subheading>Achievements</Subheading>
              <AchievementContainer>
                {achievements.map(({ title, subtitle }) => (
                  <Achievement key={subtitle.split(' ').join('-')} title={title} subtitle={subtitle} />
                ))}
              </AchievementContainer>
            </div>
          </div>
          <div className={style.profilePictureContainer}>
            <div className={style.imageContainer}>
              <Image className={style.profileImage} src={MeJpg} alt={'Picture of me'} placeholder="blur" priority />
            </div>
          </div>
        </div>
      </Section>

      <Section id="commits">
        <Subheading>Commits</Subheading>
        <CommitHistory contributions={commits} />
      </Section>

      <TimelineContainer id="my-experience" />

      <ProjectContainer projects={projects} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const stocks = await StockService.fetchCrypo();
  const achievements = await AchievementService.get();
  const projects = await ProjectService.getProjects();
  const commits = await CommitHistoryService.getCommits();
  return { props: { stocks, achievements, projects, commits } };
}
