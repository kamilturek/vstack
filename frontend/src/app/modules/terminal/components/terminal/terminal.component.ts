import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalComponent implements OnInit, AfterViewInit {

  terminal: Terminal;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.terminal = new Terminal();
    this.terminal.open(document.getElementById('xxxx'));
    const socket = new WebSocket('ws://94.245.104.69:1111/containers/734ee0637bf9/attach/ws?logs=0&stream=1&stdin=1&stdout=1&stderr=1');
    const attachAddon = new AttachAddon(socket);
    this.terminal.loadAddon(attachAddon);
    this.terminal.element.style.width = '200px'
  }
}
