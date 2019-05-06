import { Component, OnInit } from '@angular/core';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {Router} from "@angular/router";
import {RegistrationService} from "../../registration.service";

@Component({
  selector: 'app-biometric',
  templateUrl: './biometric-step.component.html',
  styleUrls: ['./biometric-step.component.scss'],
})
export class BiometricStep implements OnInit {

  canFaceId: boolean = false;
  canFingerprint: boolean = false;

  constructor(private faio: FingerprintAIO, private router: Router, private registrationService: RegistrationService) { }

  ngOnInit() {
    this.faio.isAvailable().then(data => {
      if(data === 'finger') {
        this.canFingerprint = true;
      } else if (data === 'face') {
        this.canFaceId = true;
      }
    });
  }

  useBiometric(faceId: boolean, fingerprint: boolean) {
    this.registrationService.setBiometric(faceId, fingerprint);
    this.router.navigate(["/registration/pattern-step"])
  }

}
