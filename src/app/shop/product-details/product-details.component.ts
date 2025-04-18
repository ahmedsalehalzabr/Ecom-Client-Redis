import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/Models/Product';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct
  MainImage: string;
  // reviews:IReview[]=[]
  quantity: number = 1;
  loading:boolean=false;
  constructor(
    private shopService:ShopService,
    private route:ActivatedRoute,
    private toast:ToastrService,
    private basketService:BasketService
  ){}
  ngOnInit(): void {
    this.loadProduct();
  }
  ReplaceImage(src: string) {
    this.MainImage = src;
  }
  loadProduct(){
    this.shopService.getProductDetails(parseInt(this.route.snapshot.paramMap.get('id'))).
    subscribe({
      next:((value:IProduct)=> {
        this.product=value
        this.MainImage=this.product.photos[0].imageName
      })
    })
  }
  incrementBasket() {
    if(this.quantity<10){
      this.quantity++;
      this.toast.success("item has been added to the basket","SUCCESS")
    }else{
      this.toast.warning("You can't add more than 10 items","Enough")
    }
  }
  DecrementBasket() {
    if(this.quantity>1){
      this.quantity--;
      this.toast.warning("item has been Decrement","SUCCESS")
    }else{
      this.toast.error("You can't Decrement more than 1 items","ERROR")
    }
  }
  AddToBasket(){
    this.basketService.addItemToBasket(this.product,this.quantity)
    this.toast.success("item has been added to basket","SUCCESS")
  }
  CalucateDiscount(oldPrice:number,newPrice:number):number{
    return parseFloat(
    Math.round(((oldPrice-newPrice)/oldPrice)*100).toFixed(1)      
    )
  }
  // showReview(id:number){
  //   this.loading=true
  //   this.shopService.getProductRating(id).subscribe({
  //     next:res=>{
  //       this.loading=false
  //       this.reviews=res
  //     },error(err) {
  //       console.log(err);
        
  //     },
  //   })
  // }
}

