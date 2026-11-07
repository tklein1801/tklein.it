export const config = {
  name: 'Thorben Klein',
  username: 'tklein1801',
  about: [
    [
      {text: "Greetings! I'm a budding software developer, currently undergoing my 3-year apprenticeship @ "},
      {text: 'Tchibo GmbH', href: 'https://tchibo-karriere.de/'},
      {
        text: ". I'm fascinated by the world of programming and all things tech-related, and I'm currently exploring the exciting realm of ",
      },
      {text: 'SAP development', href: 'https://sap.com/'},
      {
        text: ". If you're curious to know more about my past projects and endeavors, feel free to check out my portfolio on this website!",
      },
    ],
    [{text: "Let's dive into the world of software development together and create something amazing!"}],
  ] as {text: string; href?: string}[][],
  workedWith: {
    languages: ['TypeScript', 'JavaScript', 'PHP', 'ABAP', 'SQL', 'Java', 'Go', 'HTML & CSS'],
    technologies: [
      'ReactJS',
      'React Native',
      'Electron',
      'ExpressJS',
      'NextJS',
      'Docker',
      'NodeJS',
      'Supabase',
      'Material UI',
      'SAP Capire',
      'RAP',
      'EDA',
      'Concourse CI/CD',
      'Spring Boot',
    ],
  },
  experience: {
    events: [
      {
        year: 'Jan. 2026 - Today',
        headline: 'Specialist SAP Developer',
        description: "Promoted! I'm working as a Specialist SAP Developer at Tchibo GmbH.",
      },
      {
        year: 'Jun. 2024 - Dec. 2026',
        headline: 'Junior Specialist SAP Developer',
        description: "I'm working as a Junior Specialist SAP Developer at Tchibo GmbH.",
      },
      {
        year: 'Aug. 2021 - Jun. 2024',
        headline: 'Computer Science Expert Software Development',
        description:
          'On August 1, 2021, I started my 3-year apprenticeship as Computer Science Expert for Software Development at Tchibo GmbH.',
      },
      {
        year: 'Jun. 2019 - Jun. 2021',
        headline: 'Commercial Assistant Information Processing (KAI)',
        description:
          'Started my two-year school-based training as a Commerical Assistant Information Processing (Kaufmännischer Assistent Schwerpunkt Informationsverarbeitung)',
      },
      {
        year: '2019',
        headline: 'MSA KGS Schneverdingen',
        description: 'In July 2019 I successfully graduated from school at KGS Schneverdingen (MSA)',
      },
    ].map((event, index) => ({...event, left: index % 2 === 0})),
  },
  sidebarWidth: '360px',
};
