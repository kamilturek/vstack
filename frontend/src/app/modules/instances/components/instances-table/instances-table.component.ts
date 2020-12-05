import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceStore } from '@app/modules/instances/stores/instance.store';


@Component({
  selector: 'app-instances-table',
  templateUrl: './instances-table.component.html',
  styleUrls: ['./instances-table.component.scss']
})
export class InstancesTableComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns = ['select', 'container_id', 'name', 'status', 'image'];
  dataSource: MatTableDataSource<Instance>;

  @Input() filter: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public instanceStore: InstanceStore) { }

  ngOnInit(): void {
    this.instanceStore.refresh();
    this.instanceStore.instances$.subscribe((instances: Instance[]) => {
      this.dataSource = new MatTableDataSource(instances);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter && this.dataSource) {
      this.dataSource.filter = this.filter;
    }
  }

  ngOnDestroy(): void {
    this.instanceStore.clear();
  }

  isAllSelected(): boolean {
    const numSelected = this.instanceStore.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.instanceStore.selection.clear() :
      this.dataSource.data.forEach(row => this.instanceStore.selection.select(row));
  }

  checkboxLabel(row?: Instance): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.instanceStore.selection.isSelected(row) ? 'deselect' : 'select'} instance ${row.id}`;
  }
}
