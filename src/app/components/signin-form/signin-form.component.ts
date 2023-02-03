import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {

  signinForm : FormGroup;
  
  constructor(){

    let regexEmail : string = '^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$';
    let regexPassword : string = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$';
    let controls: any = {
      name : new FormControl('', [Validators.required]),
      surname : new FormControl('',[Validators.required]),
      username : new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      email : new FormControl('',[Validators.required, Validators.pattern(regexEmail)]),
      password : new FormControl('', [Validators.required, Validators.pattern(regexPassword)]),
      usertype : new FormControl('', [Validators.required])
    }

    this.signinForm = new FormGroup(controls);
  }

  getClass(input: string): string{
  
    if (this.signinForm.controls[input].valid) {
      return 'validInput'
    }

    switch (input) {
      case 'name':
      case 'surname':

      if (this.signinForm.controls[input].touched && this.signinForm.controls[input].errors?.['required'] ) 
      return 'invalidInput';
      break;
    
      case 'username':
      
      if (this.signinForm.controls['username'].touched && this.signinForm.controls['username'].errors?.['required'] || (this.signinForm.controls['username'].errors?.['minlength'] || this.signinForm.controls['username'].errors?.['maxlength'])) 
      return 'invalidInput';
      break;

      case 'email':
      if ((this.signinForm.controls['email'].touched && this.signinForm.controls['email'].errors?.['required']) || this.signinForm.controls['email'].errors?.['pattern']) 

      return 'invalidInput'
      break;

      case 'password' :
      if ((this.signinForm.controls['password'].touched && this.signinForm.controls['password'].errors?.['required']) || this.signinForm.controls['password'].errors?.['pattern']) 
      
      return 'invalidInput'
      break;

    }

    return 'form-control'
  }

  requiredAlert(input : string): boolean{
    return this.signinForm.controls[input].errors?.['required'] && (this.signinForm.controls[input].dirty || this.signinForm.controls[input].touched)
  }


  signin(){
    console.log(this.signinForm)
  }
}
