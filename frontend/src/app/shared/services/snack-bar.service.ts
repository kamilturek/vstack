import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService extends MatSnackBar {

    open(message: string,
        action: string = 'Hide',
        config: MatSnackBarConfig<any> = {duration: 3000 }
    ): MatSnackBarRef<SimpleSnackBar> {
        return super.open(message, action, config);
    }
}
