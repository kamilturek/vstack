import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TerminalComponent } from './components/terminal/terminal.component';
import { TerminalsComponent } from './components/terminals/terminals.component';
import { TerminalManagementComponent } from './components/terminal-management/terminal-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { TerminalCreateComponent } from './components/terminal-create/terminal-create.component';



@NgModule({
  declarations: [
    TerminalsComponent,
    TerminalComponent,
    TerminalManagementComponent,
    TerminalCreateComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FlexLayoutModule,
    MaterialModule,
  ]
})
export class TerminalModule { }
