import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserContacts(): {name: string, email: string, country: string, telephone: string} {
    return null; // todo
  }

  isAuthorized(): boolean {
    return false; // todo
  }

}
