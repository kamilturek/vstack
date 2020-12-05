import { Component, OnInit } from '@angular/core';
import { VolumeStore } from '@app/modules/volume/stores/volume.store';

@Component({
  selector: 'app-volumes-management',
  templateUrl: './volumes-management.component.html',
  styleUrls: ['./volumes-management.component.scss']
})
export class VolumesManagementComponent implements OnInit {

  constructor(public volumeStore: VolumeStore) { }

  ngOnInit(): void {
  }

}
