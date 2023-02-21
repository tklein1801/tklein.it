import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import {
  Link,
  Sidebar,
  StockWrapper,
  fetchStockData,
  Heading,
  Subheading,
  Achievement,
  AchievementContainer,
  getAchievements,
  SkillContainer,
  TimelineContainer,
  getProjects,
  ProjectContainer,
  Footer,
} from '../components/';
import styles from '../styles/Home.module.css';
import MeJpg from '../public/me.jpeg';
import Head from 'next/head';

export type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home({ stocks, achievements, projects }: HomeProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#02d463" />
        <meta property="og:image" content="/me.jpeg" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/jpg" sizes="500x500" href="/me.jpeg" />
        <title>Thorben Klein</title>
        <meta name="description" content="Information about Thorben Klein" />
      </Head>
      <div className={styles.wrapper}>
        <Sidebar />
        <main className={styles.main}>
          <section className={styles.header}>
            <nav>
              {[
                { label: 'About me', ref: '#about-me' },
                { label: 'Experience', ref: '#my-experience' },
                { label: 'My projects', ref: '#my-projects' },
                { label: 'Contact me', ref: '#contact-me' },
              ].map(({ label, ref }) => (
                <Link key={label} href={ref}>
                  {label}
                </Link>
              ))}
            </nav>
          </section>
          <StockWrapper className={styles.ticker} stocks={stocks} />

          <section id="about-me">
            <div className={styles.row}>
              <div className={styles.profileInformation}>
                <Heading>About me</Heading>
                <p>
                  Hi! I'm just a little apprentice @{' '}
                  <Link href="https://tchibo-karriere.de">Tchibo GmbH</Link>, dealing with
                  programming and other things (currently I'm taking a look at development with{' '}
                  <Link href="https://sap.com">SAP</Link>). On this website you can have a look at
                  projects & other stuff I did in the past...
                </p>

                <SkillContainer />

                <div style={{ marginTop: '1rem' }}>
                  <Subheading>Achievements</Subheading>
                  <AchievementContainer>
                    {typeof achievements === 'object' &&
                      achievements.map(({ title, subtitle }) => (
                        <Achievement
                          key={subtitle.split(' ').join('-')}
                          title={title}
                          subtitle={subtitle}
                        />
                      ))}
                  </AchievementContainer>
                </div>
              </div>
              <div className={styles.profilePictureContainer}>
                <div className={styles.imageContainer}>
                  <Image
                    className={styles.profileImage}
                    src={MeJpg}
                    alt={'Picture of me'}
                    placeholder="blur"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          <TimelineContainer id="my-experience" />

          <ProjectContainer id="my-projects" projects={projects} />

          <Footer />
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSideProps) {
  const stocks = await fetchStockData();
  const achievements = await getAchievements();
  const projects = await getProjects();
  return { props: { stocks, achievements, projects } };
}
