import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],  // ✅ استخدم "styleUrls" بصيغة الجمع
})
export class AddressComponent implements OnInit {
  
  // 🟦 النموذج يتم استلامه من المكون الأب
  @Input() address!: FormGroup;

  // 🟩 التحكم في حالة التعديل (افتراضي: غير قابل للتعديل)
  canEdit = false;

  constructor(private _service: CheckoutService) {}

  ngOnInit(): void {
    // عند التحميل، يتم جلب العنوان من الخدمة وتعبئته في النموذج
    this._service.getAddress().subscribe({
      next: (value) => {
        if (value) {
          this.address.patchValue(value);
        }
      },
      error: (err) => {
        console.error('Error loading address:', err);
      }
    });
  }

  // 🟨 دالة لحفظ التعديلات إذا كان النموذج صالح
  UpdateAddress(): void {
    if (this.address.valid) {
      this._service.updateAddress(this.address.value).subscribe({
        next: (response) => {
          console.log('Address updated successfully:', response);
        },
        error: (err) => {
          console.error('Error updating address:', err);
        }
      });
    } else {
      console.warn('Address form is invalid.');
    }
  }
}
