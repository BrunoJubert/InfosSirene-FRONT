import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { TooltipModule } from 'primeng/tooltip'; // Importez le module Tooltip

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    TooltipModule, // Ajoutez le module ici
  ],
})
export class DetailsModule {}
