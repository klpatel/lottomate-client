import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

import { AppConstants } from '../../core/constants';
import { AppService } from '../../app.service';
import { ErrorResponse } from '../../model/ErrorResponse';
import { Token } from '../../model/Token';
import { User } from '../../model/User';
import { UserService } from '../../user/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  signingIn: boolean;
  errorResponse: ErrorResponse;
  hide = true;

  //  Login page constants
  loginHeading: string = 'Signin by entering the information below' as const;
  rememberMe: string = 'Remember me' as const;
  fieldEmailErrorRequired: string = AppConstants.TEXT_FIELD_EMAIL_ERROR_REQUIRED;
  fieldEmailErrorInvalid: string = AppConstants.TEXT_FIELD_EMAIL_ERROR_INVALID;
  fieldPasswordErrorRequired: string = AppConstants.TEXT_FIELD_PASSWORD_ERROR_REQUIRED;
  notRegisterd: string = 'Not registered Yet?' as const;
  signon: string = 'SIGN UP' as const;
  
  constructor(
          private fb:FormBuilder,
          private appService: AppService,
          private userService:UserService,
          private router: Router
        )
    {
      const rememberUser = JSON.parse(localStorage.getItem('rememberUser'));
    
      this.loginForm = this.fb.group({
        emailField: new FormControl(rememberUser && rememberUser.email, [Validators.required]),
        passwordField: new FormControl('', [Validators.required]),
        rememberMeField: new FormControl(rememberUser && rememberUser.remenberMe)
      });
  }

  ngOnInit(): void {
    this.signingIn = true;
    const token: Token = JSON.parse(localStorage.getItem(AppConstants.USER_TOKEN));
    if (token && token.accessToken) {
      this.loadRequiredData(token);
    } else {
      this.signingIn = false;
    }
  }

  login() : void 
  {
      localStorage.setItem('rememberUser',JSON.stringify({
      rememberMe:this.loginForm.value.rememberMeField,
      email:this.loginForm.value.rememberMeField ? this.loginForm.value.emailField : ''
    }));

    if (this.loginForm.valid) {
      this.signingIn = true;
      this.errorResponse = null;

      const loginUser = {
        userName: this.loginForm.value.emailField,
        password: this.loginForm.value.passwordField
      };
      this.appService.singin<Token>(loginUser).subscribe( (response: Token) => {
        localStorage.setItem(AppConstants.USER_TOKEN, JSON.stringify(response));
        console.log(response.username);
        console.log(response.accessToken);
        this.router.navigate(['user']);
        //this.loadRequiredData(response);
      },
      (error: ErrorResponse) => {
        this.errorResponse = error;
        this.signingIn = false;
      });
    }

  }

  // Load pre required data after successful login.
  loadRequiredData(token: Token): void 
  {
    //const userInfo: Observable<User> = this.userService.getUser<User>();
    
    (error: ErrorResponse) => {
      this.errorResponse = error;
      this.signingIn = false;
      localStorage.removeItem(AppConstants.USER_TOKEN);
    };

  }
  showPassword(): boolean {
    this.hide = !this.hide;
    return false;
  }

}
