import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceStoreService } from '@app/modules/instances/stores/instance-store.service';


@Component({
  selector: 'app-instances-table',
  templateUrl: './instances-table.component.html',
  styleUrls: ['./instances-table.component.scss']
})
export class InstancesTableComponent implements OnInit, OnChanges {
  displayedColumns = ['container_id', 'name', 'status', 'image'];
  dataSource: MatTableDataSource<Instance>;

  @Input() filter: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private instanceStore: InstanceStoreService) { }

  ngOnInit(): void {
    this.instanceStore.instances$.subscribe((instances: Instance[]) => {
      this.dataSource = new MatTableDataSource(instances);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource) {
      this.dataSource.filter = this.filter;
    }
  }
}
