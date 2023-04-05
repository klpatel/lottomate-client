import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorResponseComponent } from './error-response/error-response.component';



@NgModule({
  declarations: [
    ErrorResponseComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorResponseComponent
  ]
})
export class GenericModule { }
