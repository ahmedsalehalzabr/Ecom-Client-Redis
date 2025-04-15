import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagnation } from '../shared/Models/Pagnation';
import { ICateogry } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseURL = 'https://localhost:7184/api/';

  constructor(private http:HttpClient) { }
  getProduct(productParam:ProductParam
  ){
    let parm=new HttpParams();
    if(productParam.CategoryId){
      parm=parm.append("categoryId",productParam.CategoryId)
    }
    if(productParam.SortSelected){
      parm=parm.append("Sort",productParam.SortSelected)
    }
    if(productParam.search){
      parm=parm.append("Search",productParam.search)
    }     
      parm=parm.append("pageNumber",productParam.pageNumber)
      parm=parm.append("pageSize",productParam.pageSize)


    return this.http.get<IPagnation>(this.baseURL+"Products/get-all",{params:parm})
  }
  getCategory(){
    return this.http.get<ICateogry[]>(this.baseURL+"Categories/get-all")
  }
  getProductDetails(id:number) {
    return this.http.get<IProduct>(this.baseURL+"Products/get-by-id/"+id)
  }
}
