import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/user', user);
  }

  login(credentials): Observable<any> {
    return this.http.post<any>('http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/user', user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/user/${user._id}`);
  }

  editUser(user: User): Observable<string> {
    return this.http.put(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/user/${user._id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<string> {
    return this.http.delete(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/user/${user._id}`, { responseType: 'text' });
  }

}
