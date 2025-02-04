import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResultsRoutingModule
  ],
  exports: [ // Ajoutez cette ligne pour exporter le composant
    ResultsComponent
  ]
})
export class ResultsModule { }
