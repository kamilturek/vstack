import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';

import { AuthModule } from '../../modules/auth/auth.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingsModule } from '../../modules/settings/settings.module';
import { TerminalModule } from '@app/modules/terminal/terminal.module';


@NgModule({
    declarations: [
        DefaultComponent,
        DashboardComponent,
    ],
    imports: [
        AuthModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
        SettingsModule,
        TerminalModule,
    ]
})
export class DefaultModule { }
