import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { ThemeOption } from '../../interfaces/theme-option';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-theme-menu',
    templateUrl: './theme-menu.component.html',
    styleUrls: ['./theme-menu.component.scss']
})
export class ThemeMenuComponent implements OnInit {

    options$: Observable<ThemeOption[]>;
    themeOption = new FormControl('indigo-pink');

    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
        this.options$ = this.themeService.getThemeOptions();
        this.themeOption.valueChanges.subscribe((value: string) => this.themeService.setTheme(value));
    }
}
