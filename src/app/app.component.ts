import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ["Aseel", "Helo"];


  // Initialize form before rendering template
  ngOnInit() {
    this.signupForm = new FormGroup({
      // controls
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        // Validators.required - just a reference: angular will execute validators.required whenever it detects that the input of the form changed  
        // quotations so during minification this property code is kept
        'email': new FormControl(null, [Validators.required, Validators.email]), // pass an array of validators
      }),
      'gender': new FormControl('male'), // default value is male
      'hobbies': new FormArray([])
    });
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

}
