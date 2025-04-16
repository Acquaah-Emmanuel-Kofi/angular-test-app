import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Ckeditor5Component } from './modules/editors/ckeditor-5/ckeditor-5.component';
import { TinymceSelfHostedComponent } from './modules/editors/tinymce-self-hosted/tinymce-self-hosted.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'ckeditor-5',
    component: Ckeditor5Component,
  },
  {
    path: 'tinymce-self-hosted',
    component: TinymceSelfHostedComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
