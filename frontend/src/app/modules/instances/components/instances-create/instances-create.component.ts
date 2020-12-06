import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { InstanceModel } from '@app/modules/instances/model/instance.model';
import { InstanceService } from '@app/modules/instances/services/instance.service';

@Component({
  selector: 'app-instances-create',
  templateUrl: './instances-create.component.html',
  styleUrls: ['./instances-create.component.scss']
})
export class InstancesCreateComponent implements OnInit {

  instanceForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<InstancesCreateComponent>,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private instanceService: InstanceService,
    @Inject(MAT_DIALOG_DATA) private data?: { image: number },
  ) { }

  ngOnInit(): void {
    this.instanceForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      image: this.fb.control(null, Validators.required),
      volumes: this.fb.control([]),
      cpuShares: this.fb.control(100, Validators.required),
      memoryLimitValue: this.fb.control(1, Validators.required),
      memoryLimitUnit: this.fb.control('g', Validators.required),
      user: this.fb.control(''),
    });

    if (this.data) {
      this.instanceForm.patchValue(this.data);
    }
  }

  add(): void {
    this.instanceForm.markAllAsTouched();
    if (this.instanceForm.invalid) {
      this.snackBar.open('Please fill in all required fields.');
    } else {
      const { name, image } = this.instanceForm.value;
      const newInstance = new InstanceModel(name, image);
      this.instanceService.create(newInstance.data).subscribe(
        () => this.dialogRef.close({ refresh: true }),
        () => this.snackBar.open('Something went wrong')
      );
    }
  }
}
