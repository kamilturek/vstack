import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Volume } from '@app/modules/volume/interfaces/volume';
import { VolumeService } from '../services/volume.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeStore {
  volumes$: Observable<Volume[]>;
  selection = new SelectionModel<Volume>(true, []);
  private volumes: BehaviorSubject<Volume[]>;

  constructor(private volumeService: VolumeService) {
    this.volumes = new BehaviorSubject<Volume[]>([]);
    this.volumes$ = this.volumes.asObservable();
    this.refresh();
  }

  refresh(): void {
    this.volumeService.getVolumes().subscribe(
      (volumes: Volume[]) => this.volumes.next(volumes)
    );
    this.selection.clear();
  }

  clear(): void {
      this.volumes.next([]);
  }
}
