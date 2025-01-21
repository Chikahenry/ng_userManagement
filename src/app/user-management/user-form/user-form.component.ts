import { Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: false,
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" formControlName="name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        <div *ngIf="userForm.get('name')?.errors?.['required'] && userForm.get('name')?.touched"
          class="text-red-500 text-sm mt-1">
          Name is required
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" formControlName="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        <div *ngIf="userForm.get('email')?.errors?.['required'] && userForm.get('email')?.touched"
          class="text-red-500 text-sm mt-1">
          Email is required
        </div>
        <div *ngIf="userForm.get('email')?.errors?.['email'] && userForm.get('email')?.touched"
          class="text-red-500 text-sm mt-1">
          Please enter a valid email
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <select formControlName="role"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select a role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
        <div *ngIf="userForm.get('role')?.errors?.['required'] && userForm.get('role')?.touched"
          class="text-red-500 text-sm mt-1">
          Role is required
        </div>
      </div>

      <div class="flex gap-4">
        <button type="submit"
          [disabled]="userForm.invalid"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer">
          {{ editMode ? 'Update' : 'Add' }} User
        </button>

        <button *ngIf="editMode" 
          type="button"
          (click)="cancelEdit()"
          class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  `
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Input() editMode = false;
  @Output() submitUser = new EventEmitter<Omit<User, 'id'>>();
  @Output() cancelEditMode = new EventEmitter<void>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role
      });
    }

    if (changes['editMode'] && !this.editMode) {
      this.resetForm();
    }
  }

  resetForm() {
    this.userForm.reset({
      name: '',
      email: '',
      role: ''
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.submitUser.emit(this.userForm.value);
      if (!this.editMode) {
        this.resetForm();
      }
    }
  }

  cancelEdit() {
    this.resetForm();
    this.cancelEditMode.emit();
  }
}