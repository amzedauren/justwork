import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-push-list',
  templateUrl: './push-list.component.html',
  styleUrls: ['./push-list.component.scss'],
})
export class PushListComponent implements OnInit {

  constructor() { }

  list = [1, 2, 3, 4, 5, 6];

  ngOnInit() {}

  delete(i) {
    this.list.splice(i, 1);
  }

}
