import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './components/start/start.component';
import { OrderComponent } from './components/order/order.component';
import { SearchComponent } from './components/search/search.component';
import { HotComponent } from './components/hot/hot.component';
import { PcontentComponent } from './components/pcontent/pcontent.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { EditpeoplepnumComponent } from './components/editpeoplepnum/editpeoplepnum.component';

const routes: Routes = [

  {path: 'start', component: StartComponent},
  {path: 'home', component: HomeComponent},
  {path: 'hot', component: HotComponent},
  {path: 'order', component: OrderComponent},
  {path: 'pcontent/:id', component: PcontentComponent},
  {path: 'search', component: SearchComponent},
  {path: 'cart', component: CartComponent},
  {path: 'editpeoplenum', component: EditpeoplepnumComponent},
  {path: '**', redirectTo: '/start', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
