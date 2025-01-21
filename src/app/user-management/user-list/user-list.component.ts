import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: false,
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">User Management</h1>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">{{ editMode ? 'Edit' : 'Add' }} User</h2>
        <app-user-form
          [user]="selectedUser"
          [editMode]="editMode"
          (submitUser)="onSubmitUser($event)"
          (cancelEditMode)="cancelEdit()">
        </app-user-form>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let user of users">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.role }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button (click)="editUser(user)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                <button (click)="deleteUser(user.id)"
                  class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;
  editMode = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmitUser(userData: Omit<User, 'id'>) {
    if (this.editMode && this.selectedUser) {
      this.userService.updateUser({ ...userData, id: this.selectedUser.id });
    } else {
      this.userService.addUser(userData);
    }
    this.resetForm();
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.editMode = true;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
      // If we're editing the user that's being deleted, reset the form
      if (this.selectedUser?.id === id) {
        this.resetForm();
      }
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.selectedUser = undefined;
    this.editMode = false;
  }
}
