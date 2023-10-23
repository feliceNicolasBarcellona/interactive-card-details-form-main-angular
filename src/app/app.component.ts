import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted: boolean = false;

  creditCard!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.creditCard = this.formBuilder.group({
      cardholderName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/\b(?:\d{4}[-\s]?){4}\b/)]],
      month: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
    });
  }

  onSubmit() {
    if (this.creditCard.valid) {
      this.submitted =  true
    } else {
      this.creditCard.markAllAsTouched()
    }
  }

  onContinue(){
    this.submitted = false;
    this.creditCard.reset()
  }
}
