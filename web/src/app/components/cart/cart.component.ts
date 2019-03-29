import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FoodService } from '../../services/food.service';
import { SocketioService } from '../../services/socketio.service';
import { Observable, Subject } from 'rxjs';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public list = [];

  public url = '';

  public peopleNum:any = 0;

  public totalNum = 0;

  public totalPrice = 0;

  private Subject$ = new Subject();

  private uid = this.localstorageservice.get('roomid');

  constructor(

    private foodservice: FoodService,
    private SocketioService: SocketioService,
    private localstorageservice: LocalstorageService,
    private router: Router,

  ) {
    this.url = this.foodservice.url;

    //监听购物车数据
    this.SocketioService.getSocket()['on']('addcart', () => {

      //获取购物车列表
      this.getCatList();

    });

  }

  ngOnInit() {

    //获取购物车列表
    this.getCatList();

    //获取用餐人数
    this.getPeopleNum();

    //添加减少食物，实现多播
    this.Subject$.pipe(
      debounceTime(500),
      switchMap(api => {
        return this.foodservice.get(api);
      })
    ).subscribe(response => {
      //计算总价
      // this.total();

      //通知同桌用户更新购物车数量
      this.SocketioService.getSocket().emit('addcart', 'addCart');

    }, erro => {
      console.log(erro);
    });

  }

  getCatList() {

    this.foodservice.get('api/cartlist?uid=' + this.localstorageservice.get('roomid')).subscribe(response => {

      this.list = response['result'];
      // console.log(this.list);

      //计算总价
      this.total();

    })

  }

  decNum(item, key) {

    let api = '';

    if (item.num > 1) {
      api = `api/decCart?uid=${this.localstorageservice.get('roomid')}&product_id=${item.product_id}&num=${item.num--}`;
    } else {
      api = `api/decCart?uid=${this.localstorageservice.get('roomid')}&product_id=${item.product_id}&num=${item.num}`;
      this.list.splice(key, 1);
    }

    this.Subject$.next(api);

    //计算总价
    this.total();

  }

  incNum(item) {

    let api = `api/incCart?uid=${this.localstorageservice.get('roomid')}&product_id=${item.product_id}&num=${item.num++}`;

    this.Subject$.next(api);

    //计算总价
    this.total();

  }

  getPeopleNum() {

    this.foodservice.get('api/PeopleInfoList?uid=' + this.localstorageservice.get('roomid')).subscribe((response) => {

      // console.log(response['result']);

      this.peopleNum = response['result'][0];

    });

  }

  total() {


    this.totalPrice = 0;
    this.totalNum = 0;

    for (const item of this.list) {

      this.totalPrice += item['price'] * item['num'];
      this.totalNum += item['num'];

    }

  }

  //下订单
  addOrder() {

    let uid = this.uid;
    let p_num = this.peopleNum.p_num;
    let p_mark = this.peopleNum.p_mark;
    let order = JSON.stringify(this.list);
    let total_price = this.totalPrice;
    let total_num = this.totalNum;

    this.foodservice.post('api/addOrder', {
      uid, p_num, p_mark, order, total_price, total_num
    }).subscribe( response => {
      
      console.log(response);
      if(response['success'] === 'true') {
        this.router.navigate(['/order']);
      }
    }, erro => {
      // console.log(erro);
    } );

  }

}
