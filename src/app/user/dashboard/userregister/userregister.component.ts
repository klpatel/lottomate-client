import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

import { ErrorResponse } from '../../../model/ErrorResponse';
import { AppConstants } from '../../../core/constants';
import { NewUser } from 'src/app/model/NewUser';
import { Store } from 'src/app/model/Store';
import { UserService } from '../../user.service';
import { Token } from 'src/app/model/Token';


@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.scss']
})
export class UserregisterComponent implements OnInit {

  userRegisterForm: FormGroup; 
  errorResponse: ErrorResponse;
  stores: Store[];
  clientId: number;
  //Page field
  fieldEmailErrorInvalid: string = AppConstants.TEXT_FIELD_EMAIL_ERROR_INVALID;
  fieldPasswordErrorInvalid: string = AppConstants.TEXT_FIELD_PASSWORD_ERROR_INVALID;
  
  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private matSnackBar: MatSnackBar,
    ) 
    {
      this.userRegisterForm = this.fb.group({
      storeField: ['',[Validators.required]],  
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
    this.getStoresForDropdown();  
  }

  getStoresForDropdown(): void{
    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    this.clientId = token.clientId;
    this.userService.getStores<Store[]>(token.clientId)
    .subscribe(
      (response: Store[]) => {
        this.stores = response;
      },
      (error: ErrorResponse) => {
        this.errorResponse = error;
      });
  }

  registerUser(): void {
    if (this.userRegisterForm.valid) {
      this.errorResponse = null;

      const singonUser = {
        userName: this.userRegisterForm.value.usernameField,
        email: this.userRegisterForm.value.emailField,
        password: this.userRegisterForm.value.passwordField,
        confirmPassword: this.userRegisterForm.value.confirmpasswordField,
        phoneNumber:this.userRegisterForm.value.phonenumberField,
        firstName:this.userRegisterForm.value.firstnameField,
        lastName:this.userRegisterForm.value.lastnameField,
        clientId:this.clientId,
        storeId:this.userRegisterForm.value.storeField
      };
      console.log(singonUser);
      this.userService.registerUser<NewUser>(singonUser).subscribe( (response: NewUser) => {
        this.showSnackBar('The user was registered successfully!');
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
  storeChangeAction(stores: Store[]):void
  {

  }
}


