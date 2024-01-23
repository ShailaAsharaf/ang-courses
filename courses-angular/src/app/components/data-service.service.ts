import { Injectable } from '@angular/core';
import { courses } from '../data-model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private data = courses.ConstValue;

  constructor() { }
  getData() {
    return this.data;
  }
}
