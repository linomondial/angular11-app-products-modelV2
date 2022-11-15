import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> |null=null;
  @Output() productsListEventEmitter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();
  readonly DataStateEnum=DataStateEnum;

  columns=["ID","Name","Price","Quantity","Selected","Available"];

  index= ["id","name","price","quantity","selected","available"];

  constructor() { }

  ngOnInit() {
  }

  onSelectProduct(p){
    this.productsListEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT,payload: p});
  }

  onUpdateProduct(p){
    this.productsListEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT,payload: p});
  }

  onDeleteProduct(p){
    this.productsListEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT,payload: p});
  }

  onActionEventItem($event: ActionEvent){
    this.productsListEventEmitter.emit($event);
  }

}
