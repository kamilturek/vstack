import { Component, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceStore } from '@app/modules/instances/stores/instance.store';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { TerminalStore } from '../../stores/terminal.store';

@Component({
  selector: 'app-terminal-create',
  templateUrl: './terminal-create.component.html',
  styleUrls: ['./terminal-create.component.scss']
})
export class TerminalCreateComponent implements OnInit, OnDestroy {

  @ViewChild(MatSelectionList) instancesList: MatSelectionList;

  instances$: Observable<Instance[]>;

  private unsubscribe$ = new Subject();

  constructor(
    private instanceStore: InstanceStore,
    private terminalStore: TerminalStore,
    private dialogRef: MatDialogRef<TerminalCreateComponent>,
  ) { }

  ngOnInit(): void {
    this.instanceStore.refresh();
    this.instances$ = this.instanceStore.instances$.pipe(
      takeUntil(this.unsubscribe$),
      map((instances: Instance[]) => instances.filter(
        (instance: Instance) => instance.status === 'running'
      )),
      shareReplay(1),
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  add(): void {
    this.terminalStore.add(
      this.instancesList.selectedOptions.selected
        .map((option: MatListOption) => option.value as Instance)
        .map((instance: Instance) => ({ vmId: instance.container_id }))
    );
    this.dialogRef.close();
  }
}
