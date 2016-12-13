import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SHARED_FORM_DIRECTIVES } from "@angular/forms/src/directives";
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  directives: [SHARED_FORM_DIRECTIVES]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = null;
  submitted: Boolean;
  success: Boolean;
  redirectTime: number;
  error: any;
  @Output() onSuccess = new EventEmitter<boolean>();

  constructor(private authS: AuthService, private tokenS: TokenService, private fb: FormBuilder) {
    this.registerForm = fb.group({
      'userName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(8), this.validateEmail])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'repeat': [null, Validators.compose([Validators.required, this.validateRepeatPassword])],
      'sq1': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      'sqa1': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'sq2': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      'sqa2': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'sq3': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      'sqa3': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.success = false;
    this.error = {};
    this.redirectTime = 5;
  }

  register(data){
    let param = {
      username: data.userName,
      email: data.email,
      password: data.password,
      securityQuestion: [
        {
          question: data.sq1,
          answer: data.sqa1
        },
        {
          question: data.sq2,
          answer: data.sqa2
        },
        {
          question: data.sq3,
          answer: data.sqa3
        }
      ]
    };
    console.log(param);
    this.authS.register(param).subscribe(data => {
        console.log(data);
        this.registerSuccess();
      }, error => {
        this.error = JSON.parse(error._body);
        console.log(this.error);
      }
    );
  }

  registerSuccess() {
    this.success = true;
    Observable.interval(1000).take(5).subscribe(()=>{
      this.redirectTime--;
      if(this.redirectTime<=0){
        this.onSuccess.emit(true);
      }
    });
  }

  validateRepeatPassword = (c: FormControl) => {
    return (!this.registerForm) ? null : c.value === this.registerForm.controls['password'].value ? null : {
      errorMsg: 'Password does not match.'
    }
  }

  validateEmail = (c: FormControl) => {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    }
  }
}
