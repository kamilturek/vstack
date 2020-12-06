import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VolumeService } from '@app/modules/volume/services/volume.service';
import { SnackBarService } from '@shared/services/snack-bar.service';

@Component({
  selector: 'app-volume-create',
  templateUrl: './volume-create.component.html',
  styleUrls: ['./volume-create.component.scss']
})
export class VolumeCreateComponent implements OnInit {
  volumeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<VolumeCreateComponent>,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private volumeService: VolumeService,
  ) { }

  ngOnInit(): void {
    this.volumeForm = this.fb.group({
      name: this.fb.control('', Validators.required),
    });
  }

  add(): void {
    if (this.volumeForm.invalid) {
      this.snackBar.open('Please fill in all required fields.');
    } else {
      this.volumeService.create(this.volumeForm.value).subscribe(
        () => this.dialogRef.close({ refresh: true }),
        () => this.snackBar.open('Something went wrong')
      );
    }
  }
}
