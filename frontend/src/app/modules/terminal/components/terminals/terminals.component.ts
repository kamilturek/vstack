import { Component, OnInit } from '@angular/core';
import { Terminal } from '@app/modules/terminal/interfaces/terminal';
import { TerminalStore } from '@app/modules/terminal/stores/terminal.store';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss']
})
export class TerminalsComponent implements OnInit {

  terminals$: Observable<Terminal[]>;

  constructor(
    private terminalStore: TerminalStore
  ) { }

  ngOnInit(): void {
    this.terminals$ = this.terminalStore.terminals$.pipe(
      shareReplay(1),
    );
  }
}
