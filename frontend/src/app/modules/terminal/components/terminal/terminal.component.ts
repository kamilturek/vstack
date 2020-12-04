import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalComponent implements AfterViewInit {
  @Input() vmId: number;

  terminal: Terminal;

  ngAfterViewInit(): void {
    this.connect();
  }

  private connect(): void {
    this.terminal = new Terminal();
    this.terminal.open(document.getElementById(this.vmId.toString()));
    const socket = new WebSocket(`ws://localhost:2375/containers/${this.vmId}/attach/ws?logs=0&stream=1&stdin=1&stdout=1&stderr=1`);
    const attachAddon = new AttachAddon(socket);
    this.terminal.loadAddon(attachAddon);
  }
}
