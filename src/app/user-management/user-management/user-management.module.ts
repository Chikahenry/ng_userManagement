import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFormComponent } from '../user-form/user-form.component';

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent }
    ])
  ]
})
export class UserManagementModule { }
