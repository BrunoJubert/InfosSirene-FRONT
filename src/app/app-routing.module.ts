import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardLayoutComponent } from './layout/standard-layout/standard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: StandardLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./pages/signup/signup.module').then((m) => m.SignupModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'results',
        loadChildren: () =>
          import('./pages/results/results.module').then((m) => m.ResultsModule),
      },
      {
        path: 'details/:siren', // Ajoutez cette ligne pour gérer les détails
        loadChildren: () =>
          import('./pages/details/details.module').then((m) => m.DetailsModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
