import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignonComponent } from './registration/signon/signon.component';
import { LoginComponent } from './registration/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component'; 
import { BackendInterceptor } from './core/backend/backend.interceptor';
import { UserModule } from './user/user.module';
import { GenericModule } from './core/generic/generic.module';
import { NegativeNumberValidatorDirective } from './shared/custom-validation/negative-number-validation';
import { DatePipe } from '@angular/common';
//import { UserRoutingModule } from './user/user-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    SignonComponent,
    LoginComponent,
    NotFoundComponent,
    NegativeNumberValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    GenericModule,
    
    //UserRoutingModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true}, DatePipe],
  bootstrap: [AppComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
