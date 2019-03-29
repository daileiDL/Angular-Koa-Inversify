import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-editpeoplepnum',
  templateUrl: './editpeoplepnum.component.html',
  styleUrls: ['./editpeoplepnum.component.scss']
})
export class EditpeoplepnumComponent implements OnInit {

  public list = [];

  public p_num = 0;
  public p_mark = 0;

  constructor(

    private foodservice: FoodService,
    private router: Router,
    private localstorageservice: LocalstorageService,

  ) { }

  ngOnInit() {

    //获取用餐人数信息
    this.getPeopleNum();

    //获取选人列表
    this.getPeopleList();

    //绑定选中事件
    this.addEvent();

  }

  getPeopleList() {

    for(let i = 0; i < 12; i++) {
      this.list.push( i + 1 + '人' );
    }

  }

  getPeopleNum() {

    this.foodservice.get('api/PeopleInfoList?uid=b008').subscribe((response) => {

      console.log(response['result']);

      let peopleNum = response['result'][0];

      this.p_mark = peopleNum.p_mark;
      this.p_num = parseInt(peopleNum.p_num);

    });

  }

  addEvent(){

    // 保存this

    var that:any=this;

    //人数的选择

    var ulDom:any = document.querySelector('#user_list');

    ulDom.onclick = function(e) {

      if(e.target.tagName == 'SPAN') {

        var lisDom:any = document.querySelectorAll('.user_list li');

        for(let i=0;i<lisDom.length;i++){
          lisDom[i].className='';
        }

        e.target.parentNode.className = 'active';
        that.p_num = e.target.innerHTML.trim()

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

  //用餐人数信息发到服务器
  addPeopleInfo() {

    this.foodservice.post('api/addPeopleInfo', {
      'uid': this.localstorageservice.get('roomid'),
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

  cancel(){

    this.router.navigate(['/cart']);
    // window.history.go(-1);

  }

}
