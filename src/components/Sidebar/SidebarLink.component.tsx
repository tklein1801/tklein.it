import React from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { Link as PageLink } from '@/components/typography';

export type SidebarLinkProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

export const SidebarLink: React.FC<SidebarLinkProps> = ({ href, children }) => {
  return (
    <li>
      <PageLink href={href}>{children}</PageLink>
    </li>
  );
};
