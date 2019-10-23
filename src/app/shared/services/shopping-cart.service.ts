import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';

import { Products } from 'shared/models/products';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    let cart = this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map((action: any) => {
        const key = action.key;
        const items = action.payload.exists()?action.payload.val().items: [];
        return new ShoppingCart(key, items);
      })
    )
    return cart;
  }

 

  async addToCart(product: Products) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Products) {
    this.updateItem(product, -1);
  }

  async updateItem(product: Products, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      let quantity = (i.payload.exists() ? i.payload.val().quantity : 0) + change;
      if(quantity === 0) item.remove();
      else item.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity 
      });
    });
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }


}
