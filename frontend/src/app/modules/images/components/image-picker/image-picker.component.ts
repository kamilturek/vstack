import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImagesListComponent } from '@app/modules/images/components/images-list/images-list.component';
import { ImagesComponent } from '@app/modules/images/components/images/images.component';
import { Image } from '@app/modules/images/interfaces/image';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImagePickerComponent,
      multi: true,
    }
  ]
})
export class ImagePickerComponent implements ControlValueAccessor {

  disabled = false;
  label = 'Select';

  private image: Image;
  private onChange$ = new Subject<Image>();
  private onTouched$ = new Subject<{}>();

  constructor(private dialog: MatDialog) { }

  writeValue(image: Image): void {
    this.image = image;
    this.label = this.image ? `${this.image.name.toLowerCase()}:${this.image.tag}` : 'Select';
  }

  registerOnChange(fn: any): void {
    this.onChange$.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched$.subscribe(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  open(): void {
    this.onTouched$.next();
    const dialog = this.dialog.open(ImagesComponent, { width: '700px', height: '500px' });

    dialog.componentInstance.imageClick.subscribe(
      (image: Image) => {
        this.writeValue(image);
        this.onChange$.next(image);
        dialog.close();
      }
    );
  }
}
