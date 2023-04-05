import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

import { ErrorResponse } from '../../model/ErrorResponse';
import { AppConstants } from '../../core/constants';
import { AppService } from '../../app.service';
import { NewUser } from 'src/app/model/NewUser';

@Component({
  selector: 'app-signon',
  templateUrl: './signon.component.html',
  styleUrls: ['./signon.component.scss']
})
export class SignonComponent implements OnInit {
  signonForm: FormGroup; 
  errorResponse: ErrorResponse;

  //Page field
  fieldEmailErrorInvalid: string = AppConstants.TEXT_FIELD_EMAIL_ERROR_INVALID;
  fieldPasswordErrorInvalid: string = AppConstants.TEXT_FIELD_PASSWORD_ERROR_INVALID;
  registerd: string = 'Already have an account?' as const;
  login: string = 'SIGN IN' as const;
  
  constructor(
    private fb: FormBuilder, 
    private appService: AppService,
    private matSnackBar: MatSnackBar,
    ) 
    {
      this.signonForm = this.fb.group({
      usernameField: new FormControl('', [Validators.required]),
      emailField: new FormControl('', [Validators.required,Validators.pattern(AppConstants.EMAIL_FORMAT)]),
      passwordField: new FormControl('', [Validators.required,Validators.pattern(AppConstants.PASSWORD_FORMAT)]),
      confirmpasswordField: new FormControl('', [Validators.required,Validators.pattern(AppConstants.PASSWORD_FORMAT)]),
      phonenumberField: new FormControl('', [Validators.required]),
      firstnameField: new FormControl('', [Validators.required]),
      lastnameField: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  signon(): void {
    if (this.signonForm.valid) {
      this.errorResponse = null;

      const singonUser = {
        userName: this.signonForm.value.usernameField,
        email: this.signonForm.value.emailField,
        password: this.signonForm.value.passwordField,
        confirmPassword: this.signonForm.value.confirmpasswordField,
        phoneNumber:this.signonForm.value.phonenumberField,
        firstName:this.signonForm.value.firstnameField,
        lastName:this.signonForm.value.lastnameField,
        clientId:3,
        storeId:4
      };
      this.appService.singon<NewUser>(singonUser).subscribe( (response: NewUser) => {
        this.showSnackBar('You are registered successfully!');
        this.loadRequiredData(response);
      },
      (error: ErrorResponse) => {
        this.errorResponse = error;
      });
    }

  }

  // Load pre required data after successful registration
  loadRequiredData(newUser:NewUser): void 
  { 
    (error: ErrorResponse) => {
      this.errorResponse = error;
    };

  }
  showSnackBar(message: string): void {
    const horizontal: MatSnackBarHorizontalPosition = 'center';
    const vertical: MatSnackBarVerticalPosition = 'top';
    this.matSnackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: horizontal,
      verticalPosition: vertical,
    });
  }


}
