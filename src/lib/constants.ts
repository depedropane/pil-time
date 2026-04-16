export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DASHBOARD_PROJECTS: '/dashboard/projects',
  DASHBOARD_PROFILE: '/dashboard/profile',
};

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_PROJECTS,
  ROUTES.DASHBOARD_PROFILE,
];
