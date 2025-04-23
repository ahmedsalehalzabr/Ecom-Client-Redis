import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { group } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
fromGroup:FormGroup;
constructor(private fb:FormBuilder){}
  ngOnInit(): void {
   this.formValidation();
  }

formValidation(){
this.fromGroup=this.fb.group({
  UserName:['',[Validators.required,Validators.minLength(6)]],
  email:['',[Validators.required,Validators.email]],
  DisplayName:['',[Validators.required]],
  password:['',[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/)]]
})
}
get _username() {
  return this.fromGroup.get('UserName');
}
get _email() {
  return this.fromGroup.get('email');
}
get _DisplayName() {
  return this.fromGroup.get('DisplayName');
}
get _password() {
  return this.fromGroup.get('password');
}
}
