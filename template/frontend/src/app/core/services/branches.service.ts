import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Branch } from '../models/branch.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private apiUrl = `${environment.apiUrl}/api/Branches`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Branch[]> {
    return this.http.get<{ data: Branch[] }>(`${this.apiUrl}/all`)
      .pipe(map(response => response.data));
  }

  getById(id: string): Observable<Branch> {
    return this.http.get<{ data: { data: Branch } }>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data.data));
  }

  create(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, branch);
  }

  update(id: string, branch: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}/${id}`, branch);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
