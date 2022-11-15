import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit { 
  
  @Input() product:Product;
  @Output() productItemEventEmitter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit() {
  }

  onSelectProduct(product: Product){
this.productItemEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload:product});
  }

  onUpdateProduct(product){
    this.productItemEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload:product});
  }

  onDeleteProduct(product){
    this.productItemEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload:product});
  }

}
