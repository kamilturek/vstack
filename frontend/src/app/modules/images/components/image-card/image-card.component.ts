import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Image } from '@app/modules/images/interfaces/image';
import { InstancesCreateComponent } from '@app/modules/instances/components/instances-create/instances-create.component';

@Component({
    selector: 'app-image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {
    @Input() image: Image;

    constructor(
        private dialog: MatDialog
    ) { }

    create(): void {
        const dialogRef = this.dialog.open(
            InstancesCreateComponent,
            {
                data: { image: this.image }
            }
        );
    }
}
