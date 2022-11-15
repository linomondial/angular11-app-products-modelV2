import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/service/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { catchError, map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 // products: Product[];
  products$: Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;

  columns=["ID","Name","Price","Quantity","Selected","Available"];

  index= ["id","name","price","quantity","selected","available"];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
  }

  /*
   onGetAllProducts() {
     this.productsService.getAllProducts().subscribe(
       (data)=>{ this.products=data;},
  (error)=> {console.log("Error Occured : "+ error); }
     )
   }
   */

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
       map(data=>({dataState: DataStateEnum.LOADED, data: data})),
       startWith({dataState: DataStateEnum.LOADING}),
       catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
   }

   onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedPoducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage: err.message}))
   );
   }

   onGetAvailableProducts() {
    this.products$= this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage: err.message}))
   );
   }

   onSearchProducts(dataForm: any) {
    this.products$= this.productsService.searchProducts(dataForm).pipe(
       map(data=>({dataState: DataStateEnum.LOADED, data:data})),
       startWith({dataState:DataStateEnum.LOADING}),
       catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage: err.message}))
    );
   }

   onSelectProduct(p: Product){
     this.productsService.selectProduct(p)
     .subscribe(data=>{
       p.selected=data.selected;
     })
   }

   onDeleteProduct(p: Product){
     let v=confirm("Etes vous sure de vouloir supprimer?")
     if(v==true)
    this.productsService.deleteProduct(p)
    .subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onUpdateProduct(p: Product){
    this.router.navigateByUrl("/updateProduct/"+p.id)
 }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct")
 }

  onActionEvent($event: ActionEvent){
  console.log($event);
  switch($event.type){
    case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
    case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
    case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
    case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct(); break;
    case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearchProducts($event.payload); break;
  }
  }

  onActionEventList($event: ActionEvent){
    console.log($event);
    switch($event.type){
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelectProduct($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onUpdateProduct($event.payload); break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDeleteProduct($event.payload); break;
    }
    }
}
