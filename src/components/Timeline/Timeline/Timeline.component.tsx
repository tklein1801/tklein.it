import React from 'react';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Typography';
import style from './Timeline.module.css';

export interface TimelineEvent {
  left: boolean;
  year: string;
  headline: string;
  description: string;
}

const EVENTS: TimelineEvent[] = [
  {
    year: 'Aug. 2021 - Today',
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
].map((event, index) => ({ ...event, left: index % 2 === 0 }));

export const Event: React.FC<TimelineEvent> = ({ left, year, headline, description }) => {
  return (
    <div className={`${style.container} ${left ? style.left : style.right}`}>
      <div className={style.content}>
        <p className={style.year}>{year}</p>
        <p className={style.headline}>{headline}</p>
        <p className={style.description}>{description}</p>
      </div>
    </div>
  );
};

export type TimelineContainerProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'id'>;

export const TimelineContainer: React.FC<TimelineContainerProps> = (props) => {
  return (
    <Section {...props}>
      <Heading>My experience</Heading>
      <div className={style.timeline}>
        {EVENTS.map((event) => (
          <Event key={event.year} {...event} />
        ))}
      </div>
    </Section>
  );
};
