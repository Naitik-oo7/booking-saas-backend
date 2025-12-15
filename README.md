# Node.js Express TypeScript Boilerplate

A production-ready boilerplate for building REST APIs with Node.js, Express, and TypeScript.

## Features

- 🚀 **Express.js** - Fast, unopinionated web framework for Node.js
- 🎯 **TypeScript** - Strongly typed programming language that builds on JavaScript
- 🗄️ **Sequelize ORM** - Modern TypeScript ORM for Node.js
- 🔐 **Zod Validation** - TypeScript-first schema declaration and validation library
- ⚡ **PostgreSQL** - Powerful, open source object-relational database system
- 🛡️ **Security** - Helmet, CORS, and rate limiting
- 📝 **Logging** - Structured logging with Morgan
- 🧪 **Testing** - Jest for unit and integration testing
- 📦 **Dependency Injection** - InversifyJS for IoC
- 🐳 **Docker Support** - Containerize your application with ease
- 🔄 **Hot Reload** - Automatic restarts during development

## Prerequisites

- Node.js >= 16.x
- PostgreSQL >= 12.x
- npm/yarn/pnpm

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd node-express-ts-starter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── config/          # Configuration files
├── middlewares/     # Express middlewares
├── models/          # Database models
├── modules/         # Feature modules
│   └── users/       # Example user module
├── routes/          # Route definitions
├── types/           # TypeScript types
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

## Environment Variables

See `.env.example` for required environment variables.

## API Endpoints

### Users

- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create a new user

## Error Handling

The application uses a centralized error handling mechanism with custom error codes and HTTP status codes.

## Validation

Request validation is performed using Zod schemas defined in each module.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
