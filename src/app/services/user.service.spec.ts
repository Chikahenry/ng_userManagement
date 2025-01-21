import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', (done) => {
    const newUser = { name: 'Test User', email: 'test@example.com', role: 'user' };
    
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(0);
      done();
    });

    service.addUser(newUser);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].name).toBe(newUser.name);
      expect(users[0].email).toBe(newUser.email);
      expect(users[0].role).toBe(newUser.role);
      done();
    });
  });

  it('should update a user', (done) => {
    const initialUser = { name: 'Test User', email: 'test@example.com', role: 'user' };
    service.addUser(initialUser);

    service.getUsers().subscribe(users => {
      const updatedUser = { ...users[0], name: 'Updated Name' };
      service.updateUser(updatedUser);

      service.getUsers().subscribe(updatedUsers => {
        expect(updatedUsers[0].name).toBe('Updated Name');
        done();
      });
    });
  });

  it('should delete a user', (done) => {
    const user = { name: 'Test User', email: 'test@example.com', role: 'user' };
    service.addUser(user);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      service.deleteUser(users[0].id);

      service.getUsers().subscribe(updatedUsers => {
        expect(updatedUsers.length).toBe(0);
        done();
      });
    });
  });
});