import { Injectable } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private profileForm = this.fb.group({
    phoneNumber: [''],
    title: [''],
    name: [''],
    surname: [''],
    iin: [''],
    email: [''],
    password: [''],
    country: [''],
  });

  constructor(private fb: FormBuilder) { }

  getForm() {
    return this.profileForm;
  }

  reset() {
    this.profileForm.reset();
  }
}
