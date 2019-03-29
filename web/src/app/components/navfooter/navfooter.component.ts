import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navfooter',
  templateUrl: './navfooter.component.html',
  styleUrls: ['./navfooter.component.scss']
})
export class NavfooterComponent implements OnInit {

  public flag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
