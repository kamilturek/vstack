import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { ThemeMenuComponent } from './components/theme-menu/theme-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsModule } from '@app/modules/notifications/notifications.module';


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        SpinnerComponent,
        ThemeMenuComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatToolbarModule,
        NotificationsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        SpinnerComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptor,
            multi: true,
        }
    ]
})
export class SharedModule { }
