import { Home, Users, BookOpen, Settings, Shield } from 'lucide-react';
import { NavigationItem } from '../types/navigation';
import { UserRole } from '../types/auth';

export const navigationItems: NavigationItem[] = [
  {
    name: 'Admin Dashboard',
    href: '/admin-dashboard',
    icon: Shield,
    roles: [UserRole.ADMIN],
  },
  {
    name: 'Student Dashboard',
    href: '/student-dashboard',
    icon: Home,
    roles: [UserRole.STUDENT],
  },
  {
    name: 'Instructor Dashboard',
    href: '/instructor-dashboard',
    icon: BookOpen,
    roles: [UserRole.INSTRUCTOR],
  },
  {
    name: 'Super Admin Dashboard',
    href: '/superadmin-dashboard',
    icon: Settings,
    roles: [UserRole.SUPER_ADMIN],
  },
];
