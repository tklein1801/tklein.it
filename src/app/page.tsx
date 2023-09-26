import React from 'react';
import Image from 'next/image';
import style from '@/style/Home.module.css';
import MeJpg from '@/../public/me.jpeg';
import {
  AchievementWrapper,
  CommitHistory,
  Heading,
  Link,
  ProjectWrapper,
  Section,
  SkillWrapper,
  StockWrapper,
  Subheading,
  TimelineContainer,
} from '@/components';

const Loading: React.FC<{ service: string }> = ({ service }) => {
  return null;
  return <p>Loading {service}</p>;
};

export default function Home() {
  return (
    <React.Fragment>
      <React.Suspense fallback={<Loading service="stocks" />}>
        <StockWrapper />
      </React.Suspense>

      <Section id="about-me">
        <div className={style.row}>
          <div className={style.profileInformation}>
            <Heading>About me</Heading>
            <p>
              Greetings! I&apos;m a budding software developer, currently undergoing my 3-year apprenticeship @{' '}
              <Link href="https://tchibo-karriere.de">Tchibo GmbH</Link>. I&apos;m fascinated by the world of
              programming and all things tech-related, and I&apos;m currently exploring the exciting realm of{' '}
              <Link href="https://sap.com">SAP</Link> development. If you&apos;re curious to know more about my past
              projects and endeavors, feel free to check out my portfolio on this website! <br />
              <br />
              Let&apos;s dive into the world of software development together and create something amazing!
            </p>

            <SkillWrapper />

            <div style={{ marginTop: '1rem' }}>
              <Subheading>Achievements</Subheading>

              <React.Suspense fallback={<Loading service="achievements" />}>
                <AchievementWrapper />
              </React.Suspense>
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
        <React.Suspense fallback={<Loading service="commit-history" />}>
          <CommitHistory />
        </React.Suspense>
      </Section>

      <TimelineContainer id="my-experience" />

      <React.Suspense fallback={<Loading service="projects" />}>
        <ProjectWrapper />
      </React.Suspense>
    </React.Fragment>
  );
}
