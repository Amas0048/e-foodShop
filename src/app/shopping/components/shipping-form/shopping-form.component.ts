import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css']
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  userId: string;
  subscription: Subscription;
  @Input('cart') cart: ShoppingCart;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
