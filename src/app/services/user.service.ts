
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: Omit<User, 'id'>): void {
    const newUser = {
      ...user,
      id: this.users.length + 1
    };
    this.users = [...this.users, newUser];
    this.usersSubject.next(this.users);
  }

  updateUser(user: User): void {
    this.users = this.users.map(u => u.id === user.id ? user : u);
    this.usersSubject.next(this.users);
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
    this.usersSubject.next(this.users);
  }

  getUserStats() {
    const totalUsers = this.users.length;
    const roleDistribution = this.users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalUsers, roleDistribution };
  }
}