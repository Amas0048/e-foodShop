import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { query } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  

  constructor(private db:AngularFireDatabase) { }

  getAll(){
    return this.db.list('/categories', ref => ref.orderByChild("name"));
  }
}
