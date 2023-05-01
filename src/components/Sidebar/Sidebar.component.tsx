import Image from 'next/image';
import styles from './Sidebar.module.css';
import Avatar from '@public/me.jpeg';
import { SidebarLink } from './SidebarLink.component';

const Links = [
  { label: 'GitHub', ref: 'https://github.com/tklein1801/' },
  { label: 'Contact me', ref: 'mailto:thorben.klein1801@gmail.com' },
  { label: 'Source Code', ref: 'https://github.com/tklein1801/tklein.it' },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <Image className={styles.avatar} src={Avatar} alt={'Picture of me'} placeholder="blur" priority />
        <h1 className={styles.name}>Thorben Klein</h1>
        <ul>
          {Links.map(({ label, ref }) => (
            <SidebarLink key={label} href={ref} children={label} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};
