import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';

import { DataTableResource, DataTable } from 'angular-4-data-table-fix';
import { Products } from 'shared/models/products';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  productsS: Products[];
  products;
  subscription: Subscription;
  tableResource: DataTableResource<Products>;
  items: Products[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.products = productService.getAll();
    this.subscription = this.products.subscribe(data => {
      this.productsS = data;
      this.initializeTable(data);
    });
  }

  private initializeTable(data: Products[]) {
    this.tableResource = new DataTableResource(data);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reloadItems(params){
    if(!this.tableResource) return;
    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.productsS.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.productsS;

      this.initializeTable(filteredProducts);
  }

}
