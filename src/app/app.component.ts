import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  submitted: boolean = false;

  creditCard: FormGroup = this.formBuilder.group({
    cardholderName: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
    ],
    cardNumber: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)],
    ],
    month: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
    year: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
  });

  cardholderName$ = this.creditCard.get('cardholderName')?.valueChanges.pipe(
    startWith(''),
    map((cardholderName) => {
      if (!cardholderName) return 'Jane Appleseed';
      return cardholderName;
    })
  );

  cardNumber$ = this.creditCard.get('cardNumber')?.valueChanges.pipe(
    startWith(''),
    map((cardNumber) => {
      if (!cardNumber) return '0000 0000 0000 0000';
      return cardNumber;
    })
  );

  month$ = this.creditCard.get('month')?.valueChanges.pipe(
    startWith(''),
    map((month) => {
      if (!month) return '00';
      return month;
    })
  );

  year$ = this.creditCard.get('year')?.valueChanges.pipe(
    startWith(''),
    map((year) => {
      if (!year) return '00';
      return year;
    })
  );

  cvc$ = this.creditCard.get('cvc')?.valueChanges.pipe(
    startWith(''),
    map((cvc) => {
      if (!cvc) return '000';
      return cvc;
    })
  );

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.creditCard.valid) {
      this.submitted = true;
    } else {
      this.creditCard.markAllAsTouched();
    }
  }

  onContinue() {
    this.submitted = false;
    this.creditCard.reset();
  }
}
