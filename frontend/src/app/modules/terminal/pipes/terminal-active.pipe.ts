import { Pipe, PipeTransform } from '@angular/core';
import { Terminal } from '@app/modules/terminal/interfaces/terminal';
import { TerminalStore } from '@app/modules/terminal/stores/terminal.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'terminalActive'
})
export class TerminalActivePipe implements PipeTransform {

  constructor(private terminalStore: TerminalStore) { }

  transform(vmId: string): Observable<boolean> {
    return this.terminalStore.terminals$.pipe(
      map((items: Terminal[]) => items.map((item: Terminal) => item.vmId)),
      map((vmIds: string[]) => vmIds.includes(vmId))
    );
  }
}
