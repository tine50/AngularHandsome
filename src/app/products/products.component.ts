import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OnInit} from '@angular/core'
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products : Array<Product> = [];
  public keyword : string = "";
  // products$! : Observable<Array<Product>>;
  constructor(private productService : ProductService){}
  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    // this.products$ = this.productService.getProducts();
    this.productService.getProducts(1, 4)
    .subscribe({
      next : data =>{
        this.products = data
      },
      error : err => {
        console.log(err);
      }
    })
  }
  handleCheckProduct(product : Product ) {
    this.productService.checkProduct(product).subscribe({
      next : () => {
        product.checked = !product.checked;
      } 
    });
  }

  handleDelete(product : Product) {
    if(confirm("Êtes vous sure de vouloir supprimer ?"))
    this.productService.deleteProduct(product).subscribe({
      next : value => {
        // this.getProducts();
        this.products = this.products.filter(p => p.id != product.id);
      }
    })
  }

  searchProducts(){
    this.productService.searchProducts(this.keyword).subscribe({
      next : value => {
        this.products = value;
      }
    })
  }
}
