import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private mySubject = new Subject<any>();

  getData() {
    return this.mySubject.asObservable();
  }

  sendData(data: any) {
    return this.mySubject.next(data);
  }

  apiUrl = 'http://localhost:3000/user'

  GetAll() {
    return this.http.get(this.apiUrl);
  }

  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  GetbyCode(code: any) {
    return this.http.get(this.apiUrl + '/' + code)
  }

  ProceedRegister(inputdata: any) {
    return this.http.post(this.apiUrl, inputdata);
  }

  UpdateUser(code: any, inputdata: any) {
    return this.http.put(this.apiUrl + '/' + code, inputdata);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  GetUserRole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }



  //create data in employees
  addEmployee(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/employees", data)
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/employees/${id}`, data);
  }

  //fetchdata
  getAllEmployee(): Observable<any> {
    return this.http.get("http://localhost:3000/employees")
  }

  //deletedata
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }



}
