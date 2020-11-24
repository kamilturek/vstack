import { Component, OnInit } from '@angular/core';
import { TerminalStore } from '@app/modules/terminal/stores/terminal.store';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss']
})
export class TerminalsComponent implements OnInit {

  constructor(
    public terminalStore: TerminalStore
  ) { }

  ngOnInit(): void {
  }

}
