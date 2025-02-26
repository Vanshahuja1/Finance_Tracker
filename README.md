# Finance Tracker Application

A full-stack finance tracking application built with TypeScript, React, Node.js, and MongoDB.

## Features

- 🔒 **User Authentication**

  - JWT-based authentication
  - Register and login functionality
  - Protected routes

- 💰 **Transaction Management**

  - Add income and expenses
  - Categorize transactions
  - Filter and sort transactions
  - Pagination support
  - Date range filtering

- 📊 **Categories**

  - Create custom categories
  - Separate income and expense categories
  - Edit and delete categories

- 📈 **Dashboard**
  - Summary of income and expenses
  - Balance calculation
  - Transaction history

## Tech Stack

### Backend

- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Input validation with Joi
- Error handling middleware
- Request logging with Morgan

### Frontend

- React 18
- TypeScript
- React Query for state management
- React Router v6
- Axios for API calls
- Modern CSS with variables
- Responsive design

### DevOps

- Docker and Docker Compose
- Nginx for frontend serving
- Environment configuration
- Production-ready setup

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Docker and Docker Compose (optional)

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd finance-tracker
   ```

2. **Backend Setup:**

   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Frontend Setup:**

   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Docker Setup

1. **Build and run with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

## Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb://localhost:27017/finance_tracker
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Categories

- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create new category
- PUT `/api/categories/:id` - Update category
- DELETE `/api/categories/:id` - Delete category

### Transactions

- GET `/api/transactions` - Get transactions (with filtering and pagination)
- POST `/api/transactions` - Create new transaction
- DELETE `/api/transactions/:id` - Delete transaction
- GET `/api/transactions/stats` - Get transaction statistics

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Write clean, modular code
- Add appropriate error handling
- Include type definitions

### Git Workflow

1. Create feature branch
2. Make changes
3. Test changes
4. Create pull request
5. Code review
6. Merge to main branch

## Production Deployment

1. Update environment variables for production
2. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

3. Build and deploy Docker containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
