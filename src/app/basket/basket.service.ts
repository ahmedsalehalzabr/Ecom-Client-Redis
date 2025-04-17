import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IProduct } from '../shared/Models/Product';
import { Basket, IBasket, IBasketItem } from '../shared/Models/Basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}
  BaseURL = "https://localhost:7184/api/";

  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  GetBasket(id: string) {
    return this.http.get(this.BaseURL + 'Baskets/get-basket-item/' + id).pipe(
      map((value: IBasket) => {
        
        if (value && value.id) {
          this.basketSource.next(value);
          console.log(value);
          return value;
        } else {
          console.error('Failed to load basket or basket is empty');
          return null;
        }
      })
    );
  }

  SetBasket(basket: IBasket) {
    return this.http
      .post(this.BaseURL + 'Baskets/update-basket', basket)
      .subscribe({
        next: (value: IBasket) => {
          this.basketSource.next(value);
          console.log(value);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  GetCurrentValue() {
    return this.basketSource.value;
  }

  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.MapProductToBasketItem(product,quantity);
    let basket = this.GetCurrentValue();
    if (!basket || !basket.id) {
      basket = this.CreateBasket();  // تأكد من أنه ليس null أو undefined
    }
    basket.basketItems = this.AddOrUpdate(basket.basketItems,itemToAdd,quantity);
    return this.SetBasket(basket);
  }

  private AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index == -1) {
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].quantity += quantity;
    }
    return basketItems;
  }

  private CreateBasket(): IBasket {
    const basket = new Basket();
    basket.id = this.generateBasketId(); // تأكد من تعيين id صحيح هنا
    localStorage.setItem('basketId', basket.id);
    return basket;
  }

  private generateBasketId(): string {
    // يمكن استخدام دالة لتوليد id فريد للسلة
    return 'basket-' + Math.random().toString(36).substring(2, 15);
  }

  private MapProductToBasketItem(
    product: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: product.id,
      name: product.name,
      image: product.photos[0].imageName,
      price: product.newPrice,
      quantity: quantity,
      category: product.categoryName,
      description:product.description,
    };
  }
}

