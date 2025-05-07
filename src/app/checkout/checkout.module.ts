import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';
import { SharedModule } from "../shared/shared.module";
import { AddressComponent } from './address/address.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    StepperComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    SharedModule
],
exports:[
  StepperComponent,
  AddressComponent
]
})
export class CheckoutModule { }
