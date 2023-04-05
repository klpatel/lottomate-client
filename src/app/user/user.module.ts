import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
    declarations: [ ],
    imports: [
        UserRoutingModule,
        MaterialModule
    ],
    
  })
  export class UserModule { }
  