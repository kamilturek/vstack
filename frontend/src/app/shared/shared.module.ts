import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        RouterModule,
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
    ]
})
export class SharedModule { }
