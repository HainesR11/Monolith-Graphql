# Monolith GraphQL Server

A comprehensive GraphQL API server built with Node.js, TypeScript, and Apollo Server. This monolithic architecture provides a unified API for managing users and posts with authentication middleware and database connectivity.

## 🚀 Features

- **GraphQL API** - Built with Apollo Server for flexible and efficient data querying
- **TypeScript** - Full type safety and modern JavaScript features
- **Authentication** - JWT-based authentication middleware
- **Database Support** - PostgreSQL integration with connection pooling
- **Post Management** - Create, read, update, and delete posts with comments and likes
- **User Management** - Complete user CRUD operations with profiles
- **Docker Support** - Containerized deployment with Docker
- **Development Tools** - Hot reloading with nodemon for development

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Docker (optional, for containerized deployment)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monolith-graphql
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=4004
   NODE_ENV=development
   
   # Database Configuration
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=your_database_name
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database Setup**
   
   Ensure your PostgreSQL database is running and accessible with the credentials provided in your `.env` file.

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm start
# or
yarn start
```

The server will start at `http://localhost:4004` with hot reloading enabled.

### Docker Deployment

1. **Build the Docker image**
   ```bash
   npm run docker-build
   # or
   yarn docker-build
   ```

2. **Run the container**
   ```bash
   npm run docker-run
   # or
   yarn docker-run
   ```

## 📡 GraphQL Schema

### User Operations

**Queries:**
- `selectAllUsers` - Retrieve all users
- `selectUser(id: ID!)` - Get a specific user by ID

**Mutations:**
- `createUser(firstName, lastName, email, username, bio)` - Create a new user
- `updateUser(id, ...)` - Update user information
- `deleteUser(id)` - Delete a user

### Post Operations

**Queries:**
- `posts(limit, offset)` - Get paginated posts
- `post(id: ID!)` - Get a specific post
- `comments(postId, limit, offset)` - Get comments for a post

**Mutations:**
- `createPost(userId, content)` - Create a new post
- `updatePost(id, content)` - Update post content
- `deletePost(id)` - Delete a post
- `likePost(postId, userId)` - Like a post
- `unlikePost(postId, userId)` - Unlike a post
- `addComment(postId, userId, content)` - Add a comment
- `deleteComment(id)` - Delete a comment
- `updateComment(id, content)` - Update a comment

## 🏗️ Project Structure

```
src/
├── @types/           # TypeScript type definitions
├── constants/        # Application constants
├── Helpers/          # Utility helper functions
├── Middleware/       # Express middleware (authentication)
├── Resolvers/        # GraphQL resolvers
│   ├── Posts/        # Post-related resolvers
│   └── Users/        # User-related resolvers
├── server/           # Server configuration and setup
├── Services/         # External service integrations
│   ├── MongoDB/      # MongoDB service (if used)
│   └── Postgres/     # PostgreSQL service
├── TypeDefs/         # GraphQL schema definitions
│   ├── Posts/        # Post schema
│   └── Users/        # User schema
├── types/            # Shared TypeScript types
└── utils/            # Utility functions
```

## 🔐 Authentication

The application includes JWT-based authentication middleware that:
- Validates incoming requests
- Extracts user information from tokens
- Protects authenticated routes

Authentication headers should be included in GraphQL requests:
```
Authorization: Bearer <your-jwt-token>
```

## 🧪 Testing

```bash
npm test
# or
yarn test
```

*Note: Test implementation is pending.*

## 📦 Dependencies

### Core Dependencies
- **@apollo/server** - GraphQL server implementation
- **express** - Web framework
- **graphql** - GraphQL implementation
- **pg** - PostgreSQL client
- **jsonwebtoken** - JWT handling
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Dependencies
- **typescript** - Type checking and compilation
- **nodemon** - Development hot reloading
- **winston** - Logging library

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 4004 |
| `NODE_ENV` | Environment mode | No | development |
| `POSTGRES_HOST` | PostgreSQL host | Yes | - |
| `POSTGRES_PORT` | PostgreSQL port | No | 5432 |
| `POSTGRES_DB` | Database name | Yes | - |
| `POSTGRES_USER` | Database user | Yes | - |
| `POSTGRES_PASSWORD` | Database password | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |


## 📞 Support

For questions and support, please open an issue in the GitHub repository.