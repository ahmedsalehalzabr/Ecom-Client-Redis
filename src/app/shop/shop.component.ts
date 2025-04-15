import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IPagnation } from '../shared/Models/Pagnation';
import { IProduct } from '../shared/Models/Product';
import { ICateogry } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  product:IProduct[];
  Category: ICateogry[];
  TotalCount:number
  ProductParam =new ProductParam();

  constructor(private shopService:ShopService){}
  ngOnInit(): void {
    this.ProductParam.SortSelected = this.SortingOption[0].value;
      this.getAllProduct();
      this.getCategory();
  }
getAllProduct(){
  this.shopService.getProduct(this.ProductParam).subscribe({
    next:((value:IPagnation)=> {
          this.product=value.data;
          this.TotalCount=value.totalCount
          this.ProductParam.pageNumber=value.pageNumber
          this.ProductParam.pageSize=value.pageSize
    })
  })
}
OnChangePage(event:any){
this.ProductParam.pageNumber=event
this.getAllProduct()
}

getCategory() {
  this.shopService.getCategory().subscribe({
    next: (value) => {
      this.Category = value;
    },
  });
}
SelectedId(categoryid:number){
  this.ProductParam.CategoryId=categoryid
  this.getAllProduct();
}

// Sorting by price
SortingOption=[
  {name:'Price',value:'Name'},
  {name:'Price:min-max',value:'PriceAce'},
  {name:'Price:max-min',value:'PriceDce'}
]
SortingByPrice(sort:Event){
this.ProductParam.SortSelected=(sort.target as HTMLInputElement).value
this.getAllProduct()
}

//filtering by wprd
OnSearch(Search:string) {
  this.ProductParam.search=Search
  this.getAllProduct()
}

@ViewChild('search') searchInput:ElementRef;
@ViewChild('SortSelected') selected:ElementRef;

//Rest all value
ResetValue(){
this.ProductParam.search="";
this.ProductParam.SortSelected = this.SortingOption[0].value;
this.ProductParam.CategoryId=0;

this.searchInput.nativeElement.value = '';

this.selected.nativeElement.selectedIndex = 0;

this.getAllProduct()

}

}
