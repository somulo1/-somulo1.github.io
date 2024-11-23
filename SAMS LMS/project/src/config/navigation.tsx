import React from 'react';
import {
  Home,
  Book,
  Users,
  Calendar,
  MessageCircle,
  Bell,
  BarChart2,
  FileText,
  Settings,
  HelpCircle,
  Briefcase,
  GraduationCap,
  Layout
} from 'lucide-react';
import { NavigationItem } from '../types/navigation';

export const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['student', 'instructor', 'admin', 'super-admin']
  },
  {
    name: 'My Courses',
    href: '/courses',
    icon: Book,
    roles: ['student', 'instructor']
  },
  {
    name: 'Course Management',
    href: '/course-management',
    icon: Layout,
    roles: ['admin', 'super-admin']
  },
  {
    name: 'Assignments',
    href: '/assignments',
    icon: FileText,
    roles: ['student', 'instructor']
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    roles: ['student', 'instructor', 'admin', 'super-admin']
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: MessageCircle,
    roles: ['student', 'instructor', 'admin', 'super-admin']
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: Bell,
    roles: ['student', 'instructor', 'admin', 'super-admin']
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart2,
    roles: ['instructor', 'admin', 'super-admin']
  },
  {
    name: 'User Management',
    href: '/users',
    icon: Users,
    roles: ['admin', 'super-admin']
  },
  {
    name: 'Departments',
    href: '/departments',
    icon: Briefcase,
    roles: ['admin', 'super-admin']
  },
  {
    name: 'Programs',
    href: '/programs',
    icon: GraduationCap,
    roles: ['admin', 'super-admin']
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['student', 'instructor', 'admin', 'super-admin']
  },
  {
    name: 'Help',
    href: '/help',
    icon: HelpCircle,
    roles: ['student', 'instructor', 'admin', 'super-admin']
  }
];
