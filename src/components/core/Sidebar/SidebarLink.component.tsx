import React from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { Link } from '../Typography';

export type SidebarLinkProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  text: string | React.ReactNode;
};

export const SidebarLink: React.FC<SidebarLinkProps> = ({ href, text }) => {
  return (
    <li>
      <Link href={href}>{text}</Link>
    </li>
  );
};
