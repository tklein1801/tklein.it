export const config = {
  name: 'Thorben Klein',
  username: 'tklein1801',
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
        year: 'Jan 2026 - Today',
        headline: 'Specialist SAP Developer',
        description: "Promoted! I'm working as a Specialist SAP Developer at Tchibo GmbH.",
      },
      {
        year: 'Jun 2024 - Jan 2026',
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
