import * as React from 'react';
import { Heading } from '../typography/heading/heading.component';
import styles from './timeline.module.css';

export interface TimelineEvent {
  left: boolean;
  year: string;
  headline: string;
  description: string;
}

export type TimelineContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

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
    <div className={`${styles.container} ${left ? styles.left : styles.right}`}>
      <div className={styles.content}>
        <p className={styles.year}>{year}</p>
        <p className={styles.headline}>{headline}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export const TimelineContainer: React.FC<TimelineContainerProps> = (props) => {
  return (
    <section {...props}>
      <Heading>My experience</Heading>

      <div className={styles.timeline}>
        {EVENTS.map((event) => (
          <Event key={event.year} {...event} />
        ))}
      </div>
    </section>
  );
};
