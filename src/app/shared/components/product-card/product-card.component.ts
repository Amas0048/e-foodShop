import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'shared/models/products';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:Products;
  @Input('show-action') showAction = true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

}
