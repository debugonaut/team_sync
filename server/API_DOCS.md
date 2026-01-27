# TeamSync API Documentation

## Authentication Endpoints

### 1. Signup
**POST** `/api/auth/signup`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@mitaoe.ac.in",
  "password": "password123",
  "studentId": "MITAOE2024001",
  "role": "student"  // Optional: defaults to "student"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@mitaoe.ac.in",
    "studentId": "MITAOE2024001",
    "role": "student"
  }
}
```

### 2. Login
**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "john@mitaoe.ac.in",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@mitaoe.ac.in",
    "studentId": "MITAOE2024001",
    "role": "student"
  }
}
```

## User Endpoints

### 3. Get User Profile
**GET** `/api/profile/:id`

**Headers:** `Authorization: Bearer <token>`

### 4. Get All Users
**GET** `/api/users`

### 5. Update Profile
**PUT** `/api/profile/:id`

## Admin Endpoints (Admin Only)

### 6. Get All Users (Admin)
**GET** `/api/admin/users?role=student&domain=coding&year=2nd`

**Headers:** `Authorization: Bearer <admin_token>`

### 7. Get User by ID (Admin)
**GET** `/api/admin/users/:id`

**Headers:** `Authorization: Bearer <admin_token>`

### 8. Delete User (Admin)
**DELETE** `/api/admin/users/:id`

**Headers:** `Authorization: Bearer <admin_token>`

### 9. Update User Role (Admin)
**PATCH** `/api/admin/users/:id/role`

**Headers:** `Authorization: Bearer <admin_token>`

**Body:**
```json
{
  "role": "admin"
}
```

### 10. Get Analytics (Admin)
**GET** `/api/admin/analytics`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "totalUsers": 150,
  "totalStudents": 148,
  "totalAdmins": 2,
  "domainStats": [
    { "_id": "coding", "count": 80 },
    { "_id": "design", "count": 40 }
  ],
  "yearStats": [
    { "_id": "1st", "count": 30 },
    { "_id": "2nd", "count": 40 }
  ]
}
```

## User Roles

- **student**: Default role, can access team matching, chat, profile
- **admin**: Full access to user management, analytics, and admin dashboard

## Setup Instructions

1. Install dependencies:
```bash
cd server
npm install
```

2. Create admin user:
```bash
npm run seed:admin
```

3. Start server:
```bash
npm run dev
```

## Default Admin Credentials
- **Email:** admin@mitaoe.ac.in
- **Password:** Admin@123
- ⚠️ **Change password after first login!**
