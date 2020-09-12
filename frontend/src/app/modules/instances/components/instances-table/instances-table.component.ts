import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { InstanceService } from '@app/modules/instances/services/instance.service';


@Component({
    selector: 'app-instances-table',
    templateUrl: './instances-table.component.html',
    styleUrls: ['./instances-table.component.scss']
})
export class InstancesTableComponent implements OnInit {
    displayedColumns = ['container_id', 'name', 'image'];
    dataSource: MatTableDataSource<Instance>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private instanceService: InstanceService) { }

    ngOnInit(): void {
        this.instanceService.getInstances().subscribe((instances: Instance[]) => {
            this.dataSource = new MatTableDataSource(instances);
            this.dataSource.sort = this.sort;
        });
    }
}
