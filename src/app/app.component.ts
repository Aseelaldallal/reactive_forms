import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ["Aseelo", "Helo"];


  // Initialize form before rendering template
  ngOnInit() {
    this.signupForm = new FormGroup({
      // controls
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        // Validators.required - just a reference: angular will execute validators.required whenever it detects that the input of the form changed  
        // quotations so during minification this property code is kept
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails), // pass an array of validators
      }),
      'gender': new FormControl('male'), // default value is male
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value);
    });
    this.signupForm.setValue({
      'userData': {
        'username': 'Aseel',
        'email': 'aseel@gmail.com'
      },
      'gender': 'male',
      'hobbies': []
    })
    // patchValue if you wanna update a small part of the form
    // Status Changes and Value Changes are two hooks you can subscribe to - cool
  }

  onAddHobby() { // really cool
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  // { nameIsForbidden: true}
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // anguolar is calling this, so 'this' is not what we expect, must bind
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        'nameIsForbidden': true
      }
    }
    return null; // IMPORTANT: if validation is successful, you MUST return nothing (omit return) or null
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'blah@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }

}
