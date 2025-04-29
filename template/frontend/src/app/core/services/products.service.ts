import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/Products`; // 🔥 igual os outros

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<{ success: boolean; message: string; data: Product[] }>(`${this.apiUrl}/all`)
      .pipe(
        map(response => response.data)
      );
  }
  
  
  getById(id: string): Observable<Product> {
    return this.http.get<{ data: { data: Product } }>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data.data) // 💥 devolve só o produto direto
      );
  }
  
  

 

  create(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}`, product);
  }

  update(id: string, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
