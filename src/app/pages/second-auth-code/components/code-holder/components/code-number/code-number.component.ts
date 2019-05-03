import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-number',
  templateUrl: './code-number.component.html',
  styleUrls: ['./code-number.component.scss'],
})
export class CodeNumberComponent implements OnInit {

  @Input() number: number | string;

  constructor() {
  }

  ngOnInit() {
  }

}
