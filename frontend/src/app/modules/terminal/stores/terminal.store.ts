import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { Terminal } from '@app/modules/terminal/interfaces/terminal';

@Injectable({
  providedIn: 'root'
})
export class TerminalStore {

  terminals$: Observable<Terminal[]>;
  private terminals: BehaviorSubject<Terminal[]>;

  constructor() {
    this.terminals = new BehaviorSubject<Terminal[]>([]);
    this.terminals$ = this.terminals.asObservable();
  }

  add(terminals: Terminal | Terminal[]): void {
    this.terminals.next(this.terminals.getValue().concat(terminals));
  }
}
