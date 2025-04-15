import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  userName: string = '';
  visibale: boolean = false;

  constructor(
    // private basketService: BasketService,
    // private _service: CoreService,
    // private router:Router
  ) {}
  // count: Observable<IBasket>;
  ngOnInit(): void {
    // const basketId = localStorage.getItem('basketId');

    // this.basketService.GetBasket(basketId).subscribe({
    //   next: (value) => {
    //     console.log(value);
    //     this.count = this.basketService.basket$;
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    // });
    // this._service.getUserName().subscribe();
    // this._service.userName$.subscribe(value=>{
    //   this.userName=value;
    // })
  }}