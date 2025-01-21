// import { TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { UserService } from './user.service';
// import { User } from '../models/user.model';
// import { firstValueFrom } from 'rxjs';

// describe('UserService', () => {
//   let service: UserService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [UserService]
//     });
//     service = TestBed.inject(UserService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should add a user', fakeAsync(async () => {
//     const newUser = { name: 'Test User', email: 'test@example.com', role: 'user' };
    
//     // Check initial state
//     let users = await firstValueFrom(service.getUsers());
//     expect(users.length).toBe(0);

//     // Add user
//     service.addUser(newUser);
//     tick();

//     // Check updated state
//     users = await firstValueFrom(service.getUsers());
//     expect(users.length).toBe(1);
//     expect(users[0].name).toBe(newUser.name);
//     expect(users[0].email).toBe(newUser.email);
//     expect(users[0].role).toBe(newUser.role);
//   }));

//   it('should update a user', fakeAsync(async () => {
//     // Add initial user
//     const initialUser = { name: 'Test User', email: 'test@example.com', role: 'user' };
//     service.addUser(initialUser);
//     tick();

//     // Get the added user
//     let users = await firstValueFrom(service.getUsers());
//     const userToUpdate: User = users[0];

//     // Update the user
//     const updatedUser = { ...userToUpdate, name: 'Updated Name' };
//     service.updateUser(updatedUser);
//     tick();

//     // Check if user was updated
//     users = await firstValueFrom(service.getUsers());
//     expect(users[0].name).toBe('Updated Name');
//     expect(users[0].id).toBe(userToUpdate.id);
//   }));

//   it('should delete a user', fakeAsync(async () => {
//     // Add a user
//     const user = { name: 'Test User', email: 'test@example.com', role: 'user' };
//     service.addUser(user);
//     tick();

//     // Verify user was added
//     let users = await firstValueFrom(service.getUsers());
//     expect(users.length).toBe(1);

//     // Delete the user
//     service.deleteUser(users[0].id);
//     tick();

//     // Verify user was deleted
//     users = await firstValueFrom(service.getUsers());
//     expect(users.length).toBe(0);
//   }));

//   it('should calculate user statistics correctly', fakeAsync(async () => {
//     // Add multiple users with different roles
//     service.addUser({ name: 'User 1', email: 'user1@example.com', role: 'admin' });
//     service.addUser({ name: 'User 2', email: 'user2@example.com', role: 'user' });
//     service.addUser({ name: 'User 3', email: 'user3@example.com', role: 'user' });
//     tick();

//     const stats = service.getUserStats();
//     expect(stats.totalUsers).toBe(3);
//     expect(stats.roleDistribution['admin']).toBe(1);
//     expect(stats.roleDistribution['user']).toBe(2);
//   }));
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';

describe('UserService - Additional Tests', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should handle updating non-existent user', fakeAsync(async () => {
    const nonExistentUser: User = { id: 999, name: 'Non-existent', email: 'none@test.com', role: 'user' };
    service.updateUser(nonExistentUser);
    tick();
    
    const users = await firstValueFrom(service.getUsers());
    expect(users.length).toBe(0);
  }));

  it('should handle deleting non-existent user', fakeAsync(async () => {
    const initialUser = { name: 'Test User', email: 'test@example.com', role: 'user' };
    service.addUser(initialUser);
    tick();

    service.deleteUser(999);
    tick();

    const users = await firstValueFrom(service.getUsers());
    expect(users.length).toBe(1);
  }));

  it('should maintain correct user IDs after deletion', fakeAsync(async () => {
    service.addUser({ name: 'User 1', email: 'user1@test.com', role: 'user' });
    service.addUser({ name: 'User 2', email: 'user2@test.com', role: 'user' });
    service.addUser({ name: 'User 3', email: 'user3@test.com', role: 'user' });
    tick();

    service.deleteUser(2);
    tick();

    const users = await firstValueFrom(service.getUsers());
    expect(users.map(u => u.id)).toEqual([1, 3]);
  }));

  it('should handle empty role distribution in stats', fakeAsync(() => {
    const stats = service.getUserStats();
    expect(stats.totalUsers).toBe(0);
    expect(Object.keys(stats.roleDistribution).length).toBe(0);
  }));

  it('should maintain user reference integrity', fakeAsync(async () => {
    const user = { name: 'Test User', email: 'test@example.com', role: 'user' };
    service.addUser(user);
    tick();

    let users = await firstValueFrom(service.getUsers());
    const firstUser = users[0];
    
    service.addUser({ name: 'Another User', email: 'another@example.com', role: 'admin' });
    tick();
    
    users = await firstValueFrom(service.getUsers());
    expect(users[0]).toEqual(firstUser);
  }));
});
// });