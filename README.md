# User Management Application

A modern Angular 19 application for managing users with features like user creation, editing, deletion, and dashboard analytics.

## Features

- **User Management**
  - Add new users with validation
  - Edit existing users
  - Delete users
  - Form validation for required fields and email format
  
- **Dashboard**
  - Total users count
  - Role distribution analytics
  - Real-time updates
  
- **Technical Features**
  - Lazy loading modules
  - Reactive forms
  - Service-based state management
  - Unit tests
  - Tailwind CSS styling
  - Responsive design

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v19)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd user-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── user.model.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   └── user.service.spec.ts
│   ├── dashboard/
│   │   └── dashboard.component.ts
│   ├── user-management/
│   │   ├── user-management.module.ts
│   │   ├── user-form/
│   │   │   └── user-form.component.ts
│   │   └── user-list/
│   │       └── user-list.component.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
└── main.ts
```

## Testing

Run the unit tests:
```bash
ng test
```

## Key Components

1. **UserService**: Manages the state and CRUD operations for users
2. **UserFormComponent**: Handles user creation and editing with validation
3. **UserListComponent**: Displays users and manages user actions
4. **DashboardComponent**: Shows user statistics and analytics

## State Management

The application uses a service-based state management approach with RxJS BehaviorSubject:

- In-memory storage of users
- Real-time updates across components
- Predictable state changes
- Easy to test and maintain

## Form Validation

The application implements the following validations:

- Required fields: name, email, role
- Email format validation
- Real-time validation feedback
- Form state management

## Styling

The application uses Tailwind CSS for styling with:

- Responsive design
- Modern UI components
- Consistent theming
- Interactive elements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, please open an issue in the repository or contact [your-email]
