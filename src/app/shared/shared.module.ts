import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagnationComponent } from './Component/pagnation/pagnation.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PagnationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    RouterModule
  ],
  exports:[
    PaginationModule,
    PagnationComponent
  ]
})
export class SharedModule { }
