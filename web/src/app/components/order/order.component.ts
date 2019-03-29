import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  list = [];

  constructor(

    private foodservice: FoodService,
    private localstorageservice: LocalstorageService,

  ) { }

  ngOnInit() {

    this.getOrder();

  }

  getOrder() {

    this.foodservice.get('api/getOrder?uid=' + this.localstorageservice.get('roomid')).subscribe((response) => {

      console.log(response);

      this.list = response['result'][0];

      console.log(this.list);

    });

  }

}
