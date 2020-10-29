import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalsComponent } from './components/terminals/terminals.component';
import { TerminalComponent } from './components/terminal/terminal.component';



@NgModule({
  declarations: [TerminalsComponent, TerminalComponent],
  imports: [
    CommonModule
  ]
})
export class TerminalModule { }
