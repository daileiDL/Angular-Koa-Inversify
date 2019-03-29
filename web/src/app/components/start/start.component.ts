import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  p_mark = '';
  p_num = '1人';

  roomid = '';

  isloading = true;

  constructor(

    private foodservice: FoodService,
    private router: Router,
    private localstorageservice: LocalstorageService,
    private route: ActivatedRoute, 
    private SocketioService: SocketioService,

  ) { 

    //获取roomid
    this.roomid = this.route.queryParams['_value'].roomid;
    //将roomid存储到localstorage
    this.localstorageservice.set('roomid', this.roomid);
    //根据房间号设置websocket
    this.SocketioService.setSocket(this.roomid);

    this.getPeopleNum();

  }

  ngOnInit() {

    //初始化事件
    this.addEvent();

  }

  addEvent(){

    // 保存this

    var that:any=this;

    //人数的选择

    var lisDom:any=document.querySelectorAll('.user_list li');
    // alert(lisDom);

    for(var i=0;i<lisDom.length;i++){

      lisDom[i].onclick=function(){

          //去掉所有li的 active class ，给当前元素加上active

          for(var j=0;j<lisDom.length;j++){

            lisDom[j].className='';
          }

          this.className='active';

          // console.log(this.querySelector('span').innerHTML);

          that.p_num=this.querySelector('span').innerHTML.trim()
          
      }
    }



    //口味的选择

    var markLisDom:any=document.querySelectorAll('.mark_list li');
    // alert(lisDom);

    for(var i=0;i<markLisDom.length;i++){

      markLisDom[i].onclick=function(){

          //去掉所有li的 active class ，给当前元素加上active

          for(var j=0;j<markLisDom.length;j++){

            markLisDom[j].className='';
          }
          this.className='active';

          that.p_mark=that.p_mark+' '+this.querySelector('span').innerHTML.trim()
          
      }
    }

  }

  addPeopleInfo() {

    this.foodservice.post('api/addPeopleInfo', {
      'uid': this.roomid,
      'p_num': this.p_num,
      'p_mark': this.p_mark,
    }).subscribe(response => {
      // console.log(response);

      //跳转到首页
      // this.router.navigate(['/home']);

    });

    //跳转到首页
    this.router.navigate(['/home']);

  }

  getPeopleNum() {

    this.foodservice.get('api/PeopleInfoList?uid=' + this.localstorageservice.get('roomid')).subscribe((response) => {

      // console.log(response['result']);
      this.isloading = false;

      let peopleNum = response['result'];

      if(peopleNum.length > 0) {
        this.router.navigate(['/home']);
      }

    });

  }

}
