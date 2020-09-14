import { Injectable } from '@angular/core';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceService } from '@app/modules/instances/services/instance.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanceStoreService {

  instances$: Observable<Instance[]>;
  private _instances$: BehaviorSubject<Instance[]>;

  constructor(private instanceService: InstanceService) {
    this._instances$ = new BehaviorSubject<Instance[]>([]);
    this.instances$ = this._instances$.asObservable();
    this.refresh();
  }

  refresh(): void {
    this.instanceService.getInstances().subscribe(
      (instances: Instance[]) => this._instances$.next(instances)
    );
  }
}
