import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Total Users</h2>
          <p class="text-4xl font-bold text-blue-600">{{ stats.totalUsers }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Role Distribution</h2>
          <div *ngFor="let role of roleDistribution" class="mb-2">
            <span class="font-medium">{{ role.name }}:</span>
            <span class="ml-2">{{ role.count }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats = { totalUsers: 0, roleDistribution: {} as Record<string, number> };
  roleDistribution: { name: string; count: number }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.updateStats();
  }

  updateStats() {
    const stats = this.userService.getUserStats();
    this.stats = stats;
    this.roleDistribution = Object.entries(stats.roleDistribution)
      .map(([name, count]) => ({ name, count }));
  }
}
