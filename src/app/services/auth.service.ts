import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http : HttpClient) {   }

  isLoggedIn():boolean{
    debugger;
    return !!localStorage.getItem('authToken');
  }

  login(user:any):Observable<any>{
    return this.http.post<any>(environment.PGMS_API+"api/Registration/Login",user);
  }
  
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
