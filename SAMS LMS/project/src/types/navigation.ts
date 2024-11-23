import { LucideIcon } from 'lucide-react';
import { UserRole } from './auth';

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
