import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StyleManagerService } from './style-manager.service';
import { ThemeOption } from '../interfaces/theme-option';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(
        private http: HttpClient,
        private styleManager: StyleManagerService
    ) {
        this.setUserTheme();
    }

    getThemeOptions(): Observable<ThemeOption[]> {
        return this.http.get<ThemeOption[]>('assets/options.json');
    }

    setTheme(value: string): void {
        this.setStyle(value);
        localStorage.setItem('theme', value);
    }

    private setUserTheme(): void {
        const theme = localStorage.getItem('theme');
        if (theme) {
            this.setStyle(theme);
        }
    }

    private setStyle(value: string): void {
        this.styleManager.setStyle('theme', `assets/${value}.css`);
    }
}
