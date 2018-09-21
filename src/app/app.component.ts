import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm : FormGroup;


  // Initialize form before rendering template
  ngOnInit() {
    this.signupForm = new FormGroup({
      // controls
      'username': new FormControl(null), // quotations so during minification this property code is kept
      'email' : new FormControl(null),
      'gender' : new FormControl('male') // default value is male
    });
   
  }
}
