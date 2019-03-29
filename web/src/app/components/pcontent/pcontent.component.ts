import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FoodService } from '../../services/food.service';
import { SocketioService } from '../../services/socketio.service';
import { LocalstorageService } from '../../services/localstorage.service';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pcontent',
  templateUrl: './pcontent.component.html',
  styleUrls: ['./pcontent.component.scss']
})
export class PcontentComponent implements OnInit {

  public food:any = {};
  
  public url = '';

  public num = 1;

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private foodservice: FoodService,
    private SocketioService: SocketioService,
    private localstorageservice: LocalstorageService,

  ) { 
    this.url = foodservice.url;
  }

  ngOnInit() {
  
    this.getDataById();

  }

  getDataById() {

    // this.foodservice.get('api/')
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        // this.selectedId = +params.get('id');
        let id = params.get('id');
        return this.foodservice.get('api/productcontent?id=' + id);
      })
    ).subscribe(Response => {
      this.food = Response['result'][0];
      // console.log(this.food);
    });

  }

  incNum() {
    ++this.num;
  }

  decNum() {
    if(this.num > 1) {
      --this.num;
    }
  }

  addCart() {
    
    //桌号是扫描二维码获取的
    let uid = this.localstorageservice.get('roomid');

    let title = this.food.title;

    let product_id = this.food._id;

    let price = this.food.price;

    let num = this.num;

    let img_url = this.food.img_url;

    //提交数据
    this.foodservice.post('api/addcart', {
      uid, title, product_id, price, num, img_url
    }).subscribe( response => {

      //通知同桌用户更新购物车数量
      this.SocketioService.getSocket().emit('addcart', 'addCart');
      
      // console.log(response);
      if(response['success'] === 'true') {
        this.router.navigate(['/home']);
      }
    }, erro => {
      // console.log(erro);
    } );

  }

}
