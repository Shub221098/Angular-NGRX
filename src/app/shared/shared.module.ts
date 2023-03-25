import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown-directive';
import { LoadingSpinnerComponent } from './loading-spinners/loading.spinners.component';
import { PlaceHolderDirective } from './placeHolderDirective/placeholder.Directive';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
    CommonModule,
  ],
})
export class SharedModule {
  
}
