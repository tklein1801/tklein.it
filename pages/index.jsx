import Head from 'next/head';
import Image from 'next/image';
// Components
import { NoResults } from '../components/NoResults';
import { Project } from '../components/Project';
import { Package } from '../components/Package';
// Assets
import profilePic from '../public/me.jpg';

const Home = ({ achievements, projects, packages }) => {
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
      label: '(JSX|TSX)',
      icon: 'fab fa-js-square',
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
      label: 'Angular',
      icon: 'fab fa-angular',
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
      type: 'FRAMEWORK',
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
      label: 'jQuery',
      icon: 'fas fa-cross',
    },
  ];

  return (
    <div className="wrapper">
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#02d463" />
        <meta property="og:image" content="/me.jpg" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/jpg" sizes="500x500" href="/me.jpg" />
        <title>Thorben Klein</title>
        <meta name="description" content="Information about Thorben Klein" />
        <link rel="stylesheet" href="/style/master.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>

      <div className="wrapper">
        <aside>
          <div>
            <div className="pic-container">
              <Image
                src={profilePic}
                alt="Picture of mine"
                layout="responsive"
                placeholder="blur"
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

          <section id="about">
            <div className="row">
              <div>
                <h1 id="about-me" className="anchored">
                  About me
                </h1>
                <p>
                  Hello! I'm just a little apprentice @{' '}
                  <a href="https://www.tchibo-karriere.de/karriere?gclid=CjwKCAjw-sqKBhBjEiwAVaQ9a6fhBbYIKNhbnMPBZA1ksit9o4VvcPldBhoTcReC1r5J4KKCkatMVhoC82QQAvD_BwE">
                    Tchibo GmbH
                  </a>{' '}
                  who's doing some programming & other random stuff. On this website you can have a
                  look on projects & some other stuff I made in the past...
                </p>

                <div id="skills-container">
                  {[
                    { heading: 'Skills I own...', content: 'SKILL' },
                    { heading: 'Frameworks', content: 'FRAMEWORK' },
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
                    <h4 className="anchored">Achievements</h4>
                    <div id="achievement">
                      <div className="stats-card">
                        <h5 id="total-projects" className="count">
                          {achievements.projects}
                        </h5>
                        <p className="label">Total Projects</p>
                      </div>
                      <div className="stats-card">
                        <h5 id="issues" className="count">
                          {achievements.issues}
                        </h5>
                        <p className="label">Issues Resolved</p>
                      </div>
                      <div className="stats-card">
                        <h5 id="followers" className="count">
                          {achievements.followers}
                        </h5>
                        <p className="label">GitHub Followers</p>
                      </div>
                      <div className="stats-card">
                        <h5 id="experience" className="count">
                          {achievements.experience}
                        </h5>
                        <p className="label">Years Experience</p>
                      </div>
                    </div>
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
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h1 id="my-projects" className="anchored">
              My projects
            </h1>
            <div id="projects">
              {projects.length > 0 ? (
                projects.map((project) => <Project project={project} />)
              ) : (
                <NoResults text="No projects found" />
              )}
            </div>
          </section>

          <section>
            <h1 id="my-packages" className="anchored">
              My npm-packages
            </h1>
            <div id="packages">
              {packages.results.length > 0 ? (
                packages.results.map((pck) => <Package content={pck} />)
              ) : (
                <NoResults text="No packages found" />
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const WANTED_REPOS = [
    'A3RLRPG-Infopanel',
    'DulliBot',
    'tklein1801.github.io',
    'BBS-Mitfahrzentrale',
    'BBS-Grid-Website',
  ];

  const req = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      Authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    },
    body: '{"query":"{\\n  viewer {\\n    createdAt\\n    issues {\\n      totalCount\\n   \\t}\\n    followers {\\n      totalCount\\n    }\\n    repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], orderBy: {field: UPDATED_AT, direction: DESC}) {\\n      totalCount\\n      pageInfo {\\n        endCursor\\n        hasNextPage\\n      }\\n      nodes {\\n        owner {\\n          login\\n        }\\n        isPrivate\\n        url\\n        name\\n        description\\n        stargazerCount\\n        forkCount\\n        primaryLanguage {\\n          name\\n          color\\n        }\\n        updatedAt\\n      }\\n    }\\n  }\\n}\\n"}',
  });
  const res = await req.json();
  const data = res.data.viewer;
  const achievements = {
    projects: data.repositories.totalCount,
    issues: data.issues.totalCount,
    followers: data.followers.totalCount,
    experience:
      Math.abs(new Date(Date.now() - new Date(data.createdAt)).getUTCFullYear() - 1971) + `+`,
  };
  const projects = data.repositories.nodes.filter((repository) =>
    WANTED_REPOS.includes(repository.name)
  );

  // NPM Packages
  const package_request = await fetch('https://api.npms.io/v2/search?q=author:tklein1801');
  const packages = await package_request.json();
  return { props: { achievements, projects, packages } };
}
