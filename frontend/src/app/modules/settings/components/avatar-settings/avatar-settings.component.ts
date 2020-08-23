import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { UserModel } from '@shared/models/user';
import { User } from '@shared/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { AvatarCropperComponent } from 'src/app/modules/settings/components/avatar-cropper/avatar-cropper.component';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
    selector: 'app-avatar-settings',
    templateUrl: './avatar-settings.component.html',
    styleUrls: ['./avatar-settings.component.scss']
})
export class AvatarSettingsComponent implements OnInit {
    @ViewChild('imageInput') imageInput: ElementRef;

    user: UserModel;
    imageChangedEvent: any = '';

    constructor(
        private userService: UserService,
        private dialog: MatDialog,
        private snackBar: SnackBarService
    ) { }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(
            (user: User) => this.user = Object.assign(new UserModel(), user)
        );
    }

    onClick(): void {
        this.imageInput.nativeElement.click();
    }

    fileChangeEvent(event: any): void {
        this.openCropper(event);
    }

    private openCropper(event: any): void {
        const dialogRef = this.dialog.open(AvatarCropperComponent, {
            data: { imageChangedEvent: event }
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            this.resetFile();
            if (result) {
                this.setAvatar(result);
            }
        });
    }

    private resetFile(): void {
        this.imageInput.nativeElement.value = '';
    }

    private setAvatar(avatar: any): void {
        this.userService.setAvatar(this.user.id, avatar).subscribe(
            (response: string) => this.snackBar.open(response),
            () => this.snackBar.open('Something went wrong.')
        );
    }
}
