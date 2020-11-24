import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TerminalCreateComponent } from '../terminal-create/terminal-create.component';

@Component({
  selector: 'app-terminal-management',
  templateUrl: './terminal-management.component.html',
  styleUrls: ['./terminal-management.component.scss']
})
export class TerminalManagementComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  add(): void {
    this.dialog.open(TerminalCreateComponent);
  }
}
