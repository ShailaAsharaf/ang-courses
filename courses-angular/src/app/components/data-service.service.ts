import { Injectable } from '@angular/core';
import { courses } from '../data-model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  cartItems: courses[] = [];
  wishItems: courses[] = [];

  constructor() { }

}
