import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './components/start/start.component';
import { OrderComponent } from './components/order/order.component';
import { SearchComponent } from './components/search/search.component';
import { HotComponent } from './components/hot/hot.component';
import { PcontentComponent } from './components/pcontent/pcontent.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
import { EditpeoplepnumComponent } from './components/editpeoplepnum/editpeoplepnum.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    OrderComponent,
    SearchComponent,
    HotComponent,
    PcontentComponent,
    CartComponent,
    HomeComponent,
    NavfooterComponent,
    EditpeoplepnumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    HttpClientJsonpModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
