import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  // we placed FormControl on the input to listen for the events.
  // anytime FormControl detects any kind of change, it will intercept that event, process it and then it will send to FormGroup
  // we are gonna create our own subclass of FormGroup to create input masking.
  // we will implement only "Setter()" which is called any time user makes a change in the input
  // "ng generate class DateFormControl" will create only a file with class
  cardForm = new FormGroup({
    // min() checks for minumum number. minLength checks for character length
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(5),
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
    ]),
    expiration: new DateFormControl('', [
      Validators.required,
      // --first one is error because of space around "|"
      // Validators.pattern(/^(0[1-9] | 1[0-2])\/\d{2}$/),
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
  });

  constructor() {
    // always analyze the object
    console.log(this.cardForm.controls.name);
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('form was submitted');
  }

  onResetClick() {
    // reset() sets the value to null even if its initial value is set.
    // in our custom input masking we pass (value:string) to the setValue(). now "null" will cause error. we have to pass (value:string | null)
    this.cardForm.reset();
  }
}
