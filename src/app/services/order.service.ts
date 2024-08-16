import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    console.log('getAllOrders() called');
    return this.http.get<Order[]>(this.apiUrl).pipe(
        tap({
            next: (data) => console.log('Order data received:', data),
            error: (error) => console.error('Error:', error)
        })
    );
}


  getOrderById(id: number): Observable<Order> {
    console.log(`getOrderById(${id}) called`);
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      tap(order => console.log('Order received:', order)),
      catchError(this.handleError)
    );
  }

  createOrder(order: Order): Observable<Order> {
    console.log('createOrder() called', order);
    return this.http.post<Order>(this.apiUrl, order).pipe(
      tap(newOrder => console.log('Order created:', newOrder)),
      catchError(this.handleError)
    );
  }

  deleteOrder(id: number): Observable<void> {
    console.log(`deleteOrder(${id}) called`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Order deleted')),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
