export type UserRole = 'super_admin' | 'admin' | 'instructor' | 'student' | 'parent' | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define permissions for each role
const rolePermissions: Record<UserRole, string[]> = {
  super_admin: [
    'manage_users',
    'manage_roles',
    'manage_courses',
    'manage_system',
    'view_analytics',
    'manage_content',
    'manage_settings',
    'view_all_data',
  ],
  admin: [
    'manage_users',
    'manage_courses',
    'view_analytics',
    'manage_content',
    'manage_settings',
  ],
  instructor: [
    'manage_courses',
    'view_course_analytics',
    'manage_assignments',
    'grade_students',
    'communicate_students',
  ],
  student: [
    'view_courses',
    'submit_assignments',
    'view_grades',
    'communicate_instructors',
    'join_study_groups',
  ],
  parent: [
    'view_child_progress',
    'view_child_grades',
    'communicate_instructors',
    'view_announcements',
  ],
  auditor: [
    'view_course_content',
    'view_system_analytics',
    'generate_reports',
  ],
};

export const hasPermission = (user: User, permission: string): boolean => {
  if (!user || !user.role) return false;
  return rolePermissions[user.role].includes(permission);
};

export const getUserPermissions = (role: UserRole): string[] => {
  return rolePermissions[role] || [];
};

// Helper function to check if a user can access a specific route
export const canAccessRoute = (user: User, route: string): boolean => {
  const roleRouteMap: Record<UserRole, string[]> = {
    super_admin: ['/super-admin', '/admin', '/instructor', '/student', '/parent', '/auditor'],
    admin: ['/admin', '/instructor', '/student'],
    instructor: ['/instructor'],
    student: ['/student'],
    parent: ['/parent'],
    auditor: ['/auditor'],
  };

  if (!user || !user.role) return false;
  return roleRouteMap[user.role].some(allowedRoute => route.startsWith(allowedRoute));
};

// Get the appropriate dashboard route for a user's role
export const getDashboardRoute = (role: UserRole): string => {
  const routeMap: Record<UserRole, string> = {
    super_admin: '/super-admin/dashboard',
    admin: '/admin/dashboard',
    instructor: '/instructor/dashboard',
    student: '/student/dashboard',
    parent: '/parent/dashboard',
    auditor: '/auditor/dashboard',
  };

  return routeMap[role] || '/';
};

// Helper function to get role-specific navigation items
export const getRoleNavigation = (role: UserRole) => {
  const navigationMap: Record<UserRole, Array<{ name: string; href: string; icon: string }>> = {
    super_admin: [
      { name: 'Dashboard', href: '/super-admin/dashboard', icon: 'home' },
      { name: 'Users', href: '/super-admin/users', icon: 'users' },
      { name: 'System Settings', href: '/super-admin/settings', icon: 'settings' },
      { name: 'Analytics', href: '/super-admin/analytics', icon: 'bar-chart' },
    ],
    admin: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: 'home' },
      { name: 'Courses', href: '/admin/courses', icon: 'book' },
      { name: 'Users', href: '/admin/users', icon: 'users' },
      { name: 'Reports', href: '/admin/reports', icon: 'file-text' },
    ],
    instructor: [
      { name: 'Dashboard', href: '/instructor/dashboard', icon: 'home' },
      { name: 'My Courses', href: '/instructor/courses', icon: 'book' },
      { name: 'Assignments', href: '/instructor/assignments', icon: 'file-text' },
      { name: 'Students', href: '/instructor/students', icon: 'users' },
    ],
    student: [
      { name: 'Dashboard', href: '/student/dashboard', icon: 'home' },
      { name: 'My Courses', href: '/student/courses', icon: 'book' },
      { name: 'Assignments', href: '/student/assignments', icon: 'file-text' },
      { name: 'Grades', href: '/student/grades', icon: 'award' },
    ],
    parent: [
      { name: 'Dashboard', href: '/parent/dashboard', icon: 'home' },
      { name: 'Child Progress', href: '/parent/progress', icon: 'trending-up' },
      { name: 'Messages', href: '/parent/messages', icon: 'mail' },
    ],
    auditor: [
      { name: 'Dashboard', href: '/auditor/dashboard', icon: 'home' },
      { name: 'Reports', href: '/auditor/reports', icon: 'file-text' },
      { name: 'Analytics', href: '/auditor/analytics', icon: 'bar-chart' },
    ],
  };

  return navigationMap[role] || [];
};

// Helper function to get role-specific dashboard components
export const getDashboardComponent = (role: UserRole) => {
  const componentMap: Record<UserRole, string> = {
    super_admin: 'SuperAdminDashboard',
    admin: 'AdminDashboard',
    instructor: 'InstructorDashboard',
    student: 'StudentDashboard',
    parent: 'ParentDashboard',
    auditor: 'AuditorDashboard',
  };

  return componentMap[role];
};
