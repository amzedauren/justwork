import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../../registration.service';
import {UserToSave} from '../../../../models/toSave/user-to-save';
import {AcsService} from '../../../../services/acs.service';

@Component({
  selector: 'app-last-step',
  templateUrl: './last-step.component.html',
  styleUrls: ['./last-step.component.scss'],
})
export class LastStepComponent implements OnInit {

  constructor(private reg: RegistrationService, private acs: AcsService) { }

  ngOnInit() {

  }

  save() {
    const form = this.reg.getForm().getRawValue();
    console.log(form);
    const toSave: UserToSave = {
      applicationCode: '',
      email: form['email'],
      name: form['name'],
      password: form['password'],
      patronymic: form['patronymic'],
      phoneNumber: form['phoneNumber'],
      surname: form['surname'],
      username: form['phoneNumber'],
      saturation: form['title'],
      countryCode: form['country'],
      nin: form['iin']
    };

    this.acs.addUser(toSave).subscribe(res => {
      console.log('acs.addUser response', res);
    });
  }

}
