import React from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { Link as PageLink } from '@/components/Typography';

export type SidebarLinkProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  text: string | React.ReactNode;
};

export const SidebarLink: React.FC<SidebarLinkProps> = ({ href, text }) => {
  return (
    <li>
      <PageLink href={href}>{text}</PageLink>
    </li>
  );
};
