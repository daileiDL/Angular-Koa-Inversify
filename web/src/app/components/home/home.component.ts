import { Component, OnInit } from '@angular/core';

import { FoodService } from '../../services/food.service';
import { SocketioService } from '../../services/socketio.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public list = [];
  public url = '';
  public cart_num = 0;
  constructor(

    private foodservice: FoodService,
    private SocketioService: SocketioService,
    private localstorageservice: LocalstorageService,

  ) { 
    this.url = this.foodservice.url;

    //监听购物车数据
    // console.log(this.SocketioService.getSocket);
    this.SocketioService.getSocket()['on']('addcart', () => {

      this.getCartNum();

    });
  }

  //侧边栏动画
  asetAnimal() {
    //按钮
    var navCate = document.getElementById('nav_cate');
    //分类
    var leftCate = document.getElementById('left_cate');

    //背景			  		
    var bg = document.getElementById('bg');

    var flag = true;

    bg.onclick = navCate.onclick = function () {

      if (flag) {

        flag = false;
        leftCate.style.transform = 'translate(0,0)';

        bg.style.display = 'block';

      } else {

        flag = true;
        leftCate.style.transform = 'translate(-100%,0)';

        bg.style.display = 'none';
      }

    }
  }

  ngOnInit() {

    this.asetAnimal();

    this.getData();

    this.getCartNum();

  }

  getData() {

    this.foodservice.get('api/productlist').subscribe((response) => {

      // console.log(response['result']);

      this.list = response['result'];

    });

  }

  toPlace(key) {
    let list = document.querySelectorAll('.item');
    document.documentElement.scrollTop = list[key]['offsetTop'];
    // console.log(list[key]['offsetTop'])
    var navCate = document.getElementById('nav_cate');
    navCate.click();
  }

  getCartNum() {

    this.foodservice.get('api/cartCount?uid=' + this.localstorageservice.get('roomid')).subscribe((response) => {

      // console.log(response['result']);

      this.cart_num = response['result'];

    });

  }

}
