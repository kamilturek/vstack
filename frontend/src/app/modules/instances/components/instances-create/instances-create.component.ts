import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { InstanceModel } from '@app/modules/instances/model/instance.model';
import { InstanceService } from '@app/modules/instances/services/instance.service';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { HttpErrorResponse } from '@angular/common/http';

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
    private instanceService: InstanceService
  ) { }

  ngOnInit(): void {
    this.instanceForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      image: this.fb.control(null, Validators.required),
      cpuShares: this.fb.control(100, Validators.required),
      memoryLimitValue: this.fb.control(1, Validators.required),
      memoryLimitUnit: this.fb.control('g', Validators.required),
      user: this.fb.control(''),
    });
  }

  add(): void {
    this.instanceForm.markAllAsTouched();
    if (this.instanceForm.invalid) {
      this.snackBar.open('Please fill in all required fields.');
    } else {
      const { name, image } = this.instanceForm.value;
      const newInstance = new InstanceModel(name, image);
      this.instanceService.create(newInstance.data).subscribe(
        (instance: Instance) => {
          this.snackBar.open(`Instance ${instance.name} (${instance.container_id}) has been created.`);
          this.dialogRef.close({ refresh: true });
        },
        (error: HttpErrorResponse) => this.snackBar.open('Something went wrong')
      );
    }
  }
}
