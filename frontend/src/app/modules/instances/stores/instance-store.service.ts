import { Injectable } from '@angular/core';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceService } from '@app/modules/instances/services/instance.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanceStoreService {

  instances$: Observable<Instance[]>;
  private instances: BehaviorSubject<Instance[]>;

  constructor(private instanceService: InstanceService) {
    this.instances = new BehaviorSubject<Instance[]>([]);
    this.instances$ = this.instances.asObservable();
    this.refresh();
  }

  refresh(): void {
    this.instanceService.getInstances().subscribe(
      (instances: Instance[]) => this.instances.next(instances)
    );
  }
}
