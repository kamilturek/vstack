import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { InstancesComponent } from './modules/instances/components/instances/instances.component';
import { SettingsComponent } from './modules/settings/components/settings/settings.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { ImagesComponent } from 'src/app/modules/images/components/images/images.component';
import { TerminalsComponent } from '@app/modules/terminal/components/terminals/terminals.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: DefaultComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'instances',
                component: InstancesComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'images',
                component: ImagesComponent
            },
            {
                path: 'terminals',
                component: TerminalsComponent,
            },
        ]
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
