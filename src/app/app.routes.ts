import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    children: [
        {
            path: 'change-detection',
            title: 'Change Detection',
            loadComponent: () => import('./features/dashboard/pages/change-detection/change-detection.component'),
          },
          {
            path: 'control-flow',
            title: 'Control Flow',
            loadComponent: () => import('./features/dashboard/pages/control-flow/control-flow.component'),
          },
          {
            path: 'defer-options',
            title: 'Defer Options',
            loadComponent: () => import('./features/dashboard/pages/defer-options/defer-options.component'),
          },
          {
            path: 'defer-views',
            title: 'Defer Views',
            loadComponent: () => import('./features/dashboard/pages/defer-views/defer-views.component'),
          },
          {
            path: 'user/:id',
            title: 'User View',
            loadComponent: () => import('./features/dashboard/pages/user/user.component'),
          },
          {
            path: 'user-list',
            title: 'User List',
            loadComponent: () => import('./features/dashboard/pages/users/users.component'),
          },
          {
            path: 'view-transition-1',
            title: 'View Transition 1',
            loadComponent: () => import('./features/dashboard/pages/view-transition/view-transition.component1'),
          },
          {
            path: 'view-transition-2',
            title: 'View Transition 2',
            loadComponent: () => import('./features/dashboard/pages/view-transition/view-transition.component2'),
          },
          {
            path: 'hosts',
            title: 'Binding and Listener',
            loadComponent: () => import('./features/dashboard/pages/hosts/hosts.component'),
          },
          {
            path: 'signal-store',
            title: 'Signal Store',
            loadComponent: () => import('./features/dashboard/pages/signalStore/signalStore.component'),
          },
          {
            path: 'ng-content',
            title: 'Content Projection',
            loadComponent: () => import('./features/dashboard/pages/content-projection-father/content-projection-father.component'),
          },
          {
            path: 'output-signals',
            title: 'Output with signals',
            loadComponent: () => import('./features/dashboard/pages/output/output/output.component'),
          },
          {
            path: 'signals',
            title: 'Signals',
            loadComponent: () => import('./features/dashboard/pages/signals/signals.component'),
          },
          {
            path: 'advanced-signals',
            title: 'Advanced Signals',
            loadComponent: () => import('./features/dashboard/pages/advanced-signals/advanced-signals.component'),
          },
          {
            path: 'resource-patterns',
            title: 'Resource Patterns',
            loadComponent: () => import('./features/dashboard/pages/resource-patterns/resource-patterns.component'),
          },
          {
            path: 'typescript-patterns',
            title: 'TypeScript Patterns',
            loadComponent: () => import('./features/dashboard/pages/typescript-patterns/typescript-patterns.component'),
          },
          {
            path:'', redirectTo: 'control-flow', pathMatch: 'full',
          }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
