import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Volume } from '@app/modules/volume/interfaces/volume';
import { VolumeStore } from '@app/modules/volume/stores/volume.store';

@Component({
  selector: 'app-volumes-table',
  templateUrl: './volumes-table.component.html',
  styleUrls: ['./volumes-table.component.scss']
})
export class VolumesTableComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns = ['select', 'vol_id', 'name'];
  dataSource: MatTableDataSource<Volume>;

  @Input() filter: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public volumeStore: VolumeStore) { }

  ngOnInit(): void {
    this.volumeStore.refresh();
    this.volumeStore.volumes$.subscribe(
      (volumes: Volume[]) => {
        this.dataSource = new MatTableDataSource(volumes);
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter && this.dataSource) {
      this.dataSource.filter = this.filter;
    }
  }

  ngOnDestroy(): void {
    this.volumeStore.clear();
  }

  isAllSelected(): boolean {
    const numSelected = this.volumeStore.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.volumeStore.selection.clear() :
      this.dataSource.data.forEach(row => this.volumeStore.selection.select(row));
  }

  checkboxLabel(row?: Volume): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.volumeStore.selection.isSelected(row) ? 'deselect' : 'select'} volume ${row.name}`;
  }
}
