import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';



@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(private categoryService:CategoryService) {
    this.categories$ = categoryService.getAll().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    });

   }

  ngOnInit() {
  }

}
