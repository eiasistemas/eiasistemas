import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private selectedCustomerSource = new BehaviorSubject<any>(null);
  selectedCustomer$ = this.selectedCustomerSource.asObservable();

  setSelectedCustomer(customer: any) {
    this.selectedCustomerSource.next(customer);
  }

  private filteredDataSource = new BehaviorSubject<any[]>([]);
  filteredData$ = this.filteredDataSource.asObservable();

  setFilteredData(data: any[]): void {
    this.filteredDataSource.next(data);
  }

  private cxcItemsSource = new Subject<any[]>();
  cxcItems$ = this.cxcItemsSource.asObservable();

  updateCxcItems(items: any[]): void {
    this.cxcItemsSource.next(items);
  }

  private itemFactItems = new Subject<any>();
  itemFact$ = this.itemFactItems.asObservable();

  updateItemFact(item: any): void {
    this.itemFactItems.next(item);
  }

  private prFactValueIntSubject = new BehaviorSubject<number>(null);
  prFactValueInt$ = this.prFactValueIntSubject.asObservable();

  setPrFactValueInt(value: number): void {
    this.prFactValueIntSubject.next(value);
  }
}
