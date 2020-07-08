import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { InstancesComponent } from './modules/instances/instances.component';
import { LoginComponent } from './modules/login/login.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'instances',
                component: InstancesComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
