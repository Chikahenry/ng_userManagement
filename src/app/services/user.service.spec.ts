
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