# CivicTrack

The Barb Shoe Store Inventory Management System is a comprehensive backend service designed to streamline inventory management, sales, and delivery processes for Barb Shoe Store. The system is built with Node.js and Express.js, leveraging PostgreSQL as the database to optimize stock levels, manage sales, and track deliveries. This system is intended to empower Barb Shoe Store to deliver exceptional customer experiences through efficient and effective inventory management.

## Table of Contents

- [Live url](#url)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Database Migrations](#database-migrations)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Live url

`https://inventory-system-k1ek.onrender.com/api/v1`

## Features

### Admin Features

- **Product Management:**
  - Add, edit, and manage products including details such as name, description, price, stock quantity, and variations (e.g., sizes, colors).
  - Hide products from client view.
- **Stock Management:**
  - Real-time tracking of product stock levels.
  - Notifications for low stock levels.
- **Variation Management:**
  - Specify available product variations such as sizes, colors, and materials.

### Client Features

- **Product Browsing:**
  - Browse and view detailed product information.
  - Filter and search products by various attributes.
- **Purchase Simulation:**
  - Simulate the purchase process including adding products to the cart, checkout, and adding billing information (no real transactions).
  - Cancel orders.

## Technology Stack

- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Hosting:** Clever Cloud (Backend)

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) (v1.x)
- [PostgreSQL](https://www.postgresql.org/) (Ensure the database is running and accessible)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LivingHopeDev/Inventory-system.git
   cd Inventory-system
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:

```env
PORT=yourPortNumber
NODE_ENV=development
AUTH_SECRET=yourSecretKey
AUTH_EXPIRY=7d
DATABASE_URL=postgresql://postgres:yourDbPassword@yourhost:yourDbport/dbName
ELASTIC_EMAIL=yourElasticEmail
ELASTIC_PASSWORD=yourElasticPassword

```

### Running the Application

#### Start the development server

```
yarn run start:dev

```

#### Access the application

The server will start on the specified PORT in your .env file. If PORT is set to 8000, the application will be available at <http://localhost:8000>.

#### Database Migrations

```
yarn prisma migrate dev
```

### API Documentation

Visit the url below to view the documentation
`https://inventory-system-k1ek.onrender.com/api/docs`
`localhost:8000/api/docs`

### Contributing

Contributions are welcome!

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Key Points

- The `README.md` provides a comprehensive guide on setting up the project locally, including installation instructions, environment variable configuration, and starting the server.
- Since the API documentation is not yet available, it includes a placeholder indicating that it will be provided later.
- The setup instructions are tailored specifically for a Node.js and PostgreSQL environment using Yarn.

This `README.md` file should serve as a solid foundation for your project documentation. Let me know if you need any changes or additional information!
