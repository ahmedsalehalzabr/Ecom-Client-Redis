import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  private _formBuilder = inject(FormBuilder);

  currentStep = 1;

  Address = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    state: ['', Validators.required],
  });

  DeliveryMethod = this._formBuilder.group({
    delivery: ['', Validators.required],
  });

  PaymentForm = this._formBuilder.group({
    nameOnCard: ['', Validators.required]
  });

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  submit() {
    if (this.Address.valid && this.DeliveryMethod.valid && this.PaymentForm.valid) {
      console.log('Form Submitted');
    } else {
      console.log('Please fill all required fields.');
    }
  }
}
