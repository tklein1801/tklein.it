import { Subheading } from '@/components/Typography/Heading';
import { Skill } from './Skill.component';
import { FRAMEWORKS, SKILLS } from '.';
import style from './Skill.module.css';

export const SkillContainer = () => {
  return (
    <div className={style.skillsContainer}>
      <div>
        <Subheading>Skills I own...</Subheading>
        <ul className={style.container}>
          {SKILLS.map((skill) => (
            <Skill key={skill.label} {...skill} />
          ))}
        </ul>
      </div>
      <div>
        <Subheading>Frameworks & Libraries</Subheading>
        <ul className={style.container}>
          {FRAMEWORKS.map((framework) => (
            <Skill key={framework.label} {...framework} />
          ))}
        </ul>
      </div>
    </div>
  );
};
