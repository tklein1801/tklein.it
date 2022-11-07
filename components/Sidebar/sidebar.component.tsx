import Image from 'next/image';
import MeJpg from '../../public/me.jpeg';
import { Link } from '../Typography/Link/link.component';
import styles from './sidebar.module.css';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <div className={styles.sidebarImageContainer}>
          <Image
            className={styles.sidebarImage}
            src={MeJpg}
            alt={'Picture of me'}
            placeholder="blur"
            priority
          />
        </div>
        <h1 className={styles.sidebarName}>Thorben Klein</h1>
        <ul>
          {[
            { label: 'GitHub', ref: 'https://github.com/tklein1801/' },
            { label: 'Contact me', ref: 'mailto:thorben.klein1801@gmail.com' },
            { label: 'Source Code', ref: 'https://github.com/tklein1801/tklein.it' },
          ].map(({ label, ref }) => (
            <li key={label}>
              <Link href={ref}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
