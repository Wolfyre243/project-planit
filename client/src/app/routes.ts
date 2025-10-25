import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/landing-page.tsx'),

  ...prefix('dashboard', [
    layout('routes/dashboard/layout.tsx', [
      route('/', 'routes/dashboard/index.tsx'),
    ])
  ]),

  // Auth routes
  ...prefix('auth', [
    layout('routes/auth/layout.tsx', [
      route('/login', 'routes/auth/login.tsx'),
      route('/register', 'routes/auth/register.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
