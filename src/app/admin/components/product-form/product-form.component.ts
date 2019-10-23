import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'


import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories;
  product = {};
  id;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productService: ProductService) {
    categoryService.getAll().valueChanges().subscribe(categories => {
      this.categories = categories;
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).valueChanges().take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are sure you want to delete this product?')) return;
     this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
