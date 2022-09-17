import Image from 'next/image';
// Components
import { HeadTemplate } from '../components/HeadTemplate';
import { StockContainer } from '../components/stock/stock.component,';
import { ProjectContainer } from '../components/project/project.component';
import { PackageContainer } from '../components/project/package.component';
// Assets
import profilePic from '../public/me.jpg';
import { Timeline } from '../components/experience/experience.component';
import { AchievementWrapper } from '../components/archievement/archievement.component';
import { ProjectPromotion } from '../components/project-promotion/project-promotion.component';

const Home = ({ crypto, achievements, projects, packages }) => {
  const sidebar_links = [
    {
      label: 'GitHub',
      reference: 'https://github.com/tklein1801',
    },
    {
      label: 'Instagram',
      reference: 'https://instagram.com/thorben.klein',
    },
    {
      label: 'Source Code',
      reference: 'https://github.com/tklein1801/tklein.it',
    },
    {
      label: 'Contact me',
      reference: 'mailto:thorben.klein1801@gmail.com',
    },
  ];

  const header_links = [
    {
      label: 'About me',
      reference: '#about-me',
    },
    {
      label: 'Experience',
      reference: '#experience',
    },
    {
      label: 'My projects',
      reference: '#my-projects',
    },
    {
      label: 'My packages',
      reference: '#my-packages',
    },
    {
      label: 'Contact me',
      reference: 'mailto:thorben.klein1801@gmail.com',
    },
  ];

  const skills = [
    {
      type: 'SKILL',
      label: 'TypeScript',
      icon: 'fab fa-js-square',
    },
    {
      type: 'SKILL',
      label: 'JavaScript',
      icon: 'fab fa-js-square',
    },
    {
      type: 'SKILL',
      label: 'PHP',
      icon: 'fab fa-php',
    },
    {
      type: 'SKILL',
      label: 'HTML',
      icon: 'fab fa-html5',
    },
    {
      type: 'SKILL',
      label: '(SA|C)SS',
      icon: 'fab fa-sass',
    },
    {
      type: 'FRAMEWORK',
      label: 'ReactJS',
      icon: 'fab fa-react',
    },
    {
      type: 'FRAMEWORK',
      label: 'React Native',
      icon: 'fab fa-react',
    },
    {
      type: 'FRAMEWORK',
      label: 'DiscordJS',
      icon: 'fab fa-discord',
    },
    {
      type: 'FRAMEWORK',
      label: 'Bootstrap',
      icon: 'fab fa-bootstrap',
    },
    {
      type: 'SKILL',
      label: 'SQL',
      icon: 'fa fa-database',
    },
    {
      type: 'FRAMEWORK',
      label: 'Firebase',
      icon: 'fa fa-database',
    },
    {
      type: 'FRAMEWORK',
      label: 'Supabase',
      icon: 'fa fa-database',
    },
    {
      type: 'FRAMEWORK',
      label: 'jQuery',
      icon: 'fas fa-cross',
    },
  ];

  return (
    <div className="wrapper">
      <HeadTemplate />

      <div className="wrapper">
        <aside>
          <div>
            <div className="pic-container">
              <Image
                src={profilePic}
                alt="Picture of mine"
                layout="responsive"
                placeholder="blur"
                priority
              />
            </div>
            <h2 className="name">Thorben Klein</h2>
            <ul>
              {sidebar_links.map((link, index) => (
                <li key={index}>
                  <a href={link.reference}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main>
          <section className="header">
            <nav>
              {header_links.map((link, index) => (
                <a key={index} href={link.reference}>
                  {link.label}
                </a>
              ))}
            </nav>
          </section>

          <StockContainer crypto={crypto} />

          <section id="about">
            <div className="row">
              <div>
                <h1 id="about-me">About me</h1>
                <p>
                  Hi! I'm just a little apprentice @{' '}
                  <a href="https://www.tchibo-karriere.de/karriere?gclid=CjwKCAjw-sqKBhBjEiwAVaQ9a6fhBbYIKNhbnMPBZA1ksit9o4VvcPldBhoTcReC1r5J4KKCkatMVhoC82QQAvD_BwE">
                    Tchibo GmbH
                  </a>
                  , dealing with programming and other things (currently I'm taking a look at
                  development with <a href="//www.sap.com">SAP</a>). On this website you can have a
                  look at projects & other stuff I did in the past...
                </p>

                <div id="skills-container">
                  {[
                    { heading: 'Skills I own...', content: 'SKILL' },
                    { heading: 'Frameworks & Libraries', content: 'FRAMEWORK' },
                  ].map((section, index) => (
                    <div key={index} className="skill-column">
                      <h4>{section.heading}</h4>
                      <ul id="skills" className="skill-list">
                        {skills
                          .filter((skill) => skill.type == section.content)
                          .map((skill, i) => (
                            <li key={i} className="skill-item">
                              <i className={skill.icon} /> {skill.label}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}

                  <div className="skill-column achievements">
                    <h4>Achievements</h4>
                    <AchievementWrapper
                      achievements={[
                        {
                          title: achievements.projects,
                          subtitle: 'Total Projects',
                        },
                        {
                          title: achievements.issues,
                          subtitle: 'Issues Resolved',
                        },
                        {
                          title: achievements.followers,
                          subtitle: 'GitHub Follower',
                        },
                        {
                          title: achievements.experience,
                          subtitle: 'Years Experience',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="pic-container">
                  <Image
                    src={profilePic}
                    alt="Picture of mine"
                    layout="responsive"
                    placeholder="blur"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          <Timeline />
          <ProjectContainer projects={projects} />
          <ProjectPromotion />
        </main>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let request, response;
  request = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      Authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    },
    body: '{"query":"{\\n  viewer {\\n    login\\n    createdAt\\n    issues {\\n      totalCount\\n    }\\n    company\\n    bio\\n    followers {\\n      totalCount\\n    }\\n    repositories {\\n      totalCount\\n    }\\n    pinnedItems(first: 6, types: REPOSITORY) {\\n      edges {\\n        node {\\n          ... on Repository {\\n            id\\n owner {\\n login\\n }\\n            name\\n            description\\n            url\\n            primaryLanguage {\\n              name\\n              color\\n            }\\n            stargazerCount\\n            forkCount\\n          }\\n        }\\n      }\\n    }\\n  }\\n}","variables":{}}',
    method: 'POST',
  });
  response = await request.json();
  const achievements = {
    projects: response.data.viewer.repositories.totalCount,
    issues: response.data.viewer.issues.totalCount,
    followers: response.data.viewer.followers.totalCount,
    experience: Math.abs(
      new Date(Date.now() - new Date(response.data.viewer.createdAt)).getUTCFullYear() - 1971
    ),
  };

  const projects = response.data.viewer.pinnedItems.edges.map((node) => ({ ...node.node }));

  // Crypto data
  request = await fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20&convert=EUR',
    {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP,
      },
    }
  );
  const crypto = await request.json();
  return { props: { crypto, achievements, projects } };
}
