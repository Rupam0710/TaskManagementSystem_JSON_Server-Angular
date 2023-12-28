import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
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
  // addEmployee(data: any): Observable<any> {
  //   return this.http.post("http://localhost:3000/employees", data)
  // }

  // updateEmployee(id: number, data: any): Observable<any> {
  //   return this.http.put(`http://localhost:3000/employees/${id}`, data);
  // }

  //fetchdata
  // getAllEmployee(): Observable<any> {
  //   return this.http.get("http://localhost:3000/employees")
  // }


  //deletedata
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }

  private taskCounter = 0;
  generateTaskId(): string {
    this.taskCounter++;
    return `#${this.taskCounter.toString().padStart(3, '0')}`;
  }


  addTask(id: any, task: any): Observable<any> {
    const userTasksUrl = `${this.apiUrl}/${id}`;
    return this.http.get<any>(userTasksUrl).pipe(
      switchMap(user => {
        user.tasks = user.tasks || [];
        task.id = this.generateTaskId();
        user.tasks.push(task);
        return this.http.put<any>(userTasksUrl, user);
      })
    )
  }

  getEmployeeList(id: any): Observable<any> {
    const userTasksUrl = `${this.apiUrl}/${id}`;
    return this.http.get<any>(userTasksUrl);
  }

  deleteTask(userId: any, taskId: any): Observable<any> {
    const userTasksUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(userTasksUrl).pipe(
      switchMap(user => {
        user.tasks = user.tasks.filter(task => task.id !== taskId);
        return this.http.put<any>(userTasksUrl, user);
      })
    )
  }




  updateTask(userId: any, taskId: any, updatedTask: any): Observable<any> {
    const userTasksUrl = `${this.apiUrl}/${userId}`;



    return this.http.get<any>(userTasksUrl).pipe(
      switchMap(user => {
        const index = user.tasks.findIndex(task => task.id === taskId);


        if (index !== -1) {
          // user.tasks[index] = updatedTask;
          user.tasks[index].id = taskId;
          user.tasks[index].firstname = updatedTask.firstname;
          user.tasks[index].lastname = updatedTask.lastname;
          user.tasks[index].email = updatedTask.email;
          user.tasks[index].duedate = updatedTask.duedate;
          user.tasks[index].gender = updatedTask.gender;
          user.tasks[index].category = updatedTask.category;
          user.tasks[index].company = updatedTask.company;
          user.tasks[index].task = updatedTask.task;
          user.tasks[index].status = updatedTask.status;




        }
        return this.http.put<any>(userTasksUrl, user);
      })
    )
  }



}
