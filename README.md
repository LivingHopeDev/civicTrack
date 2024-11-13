# CivicTrack API

CivicTrack is a free, open-source platform designed to help African communities keep track of their local politicians, their promises, and the projects they've completed. The CivicTrack API serves as the backend service for the web application, enabling users to access detailed information about their political representatives, their work, and achievements

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

`https://civictrack.onrender.com/api/v1`

## Key Features

User Profiles: Create and manage profiles for citizens and political representatives.
Social Media Integration: Track and display social media links for citizens and political representatives.
Project and Promise Tracking: Keep track of political promises and completed projects.
Politician Information: View detailed information about politicians, including their professional background, education, party affiliation, and more.
The API is built to facilitate transparent access to political data and make it easy for citizens to stay informed about local government activities. It ensures that the public has access to reliable and up-to-date information about their leaders, making it easier to participate in local governance and hold politicians accountable.

## Technology Stack

- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL,avien
- **Hosting:** Render (Backend)

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) (v1.x)
- [PostgreSQL](https://www.postgresql.org/) (Ensure the database is running and accessible)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LivingHopeDev/civicTrack.git
   cd civicTrack
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:

Check the `.env.example` file

### Running the Application

#### Start the development server

```
yarn run start:dev

```

#### Access the application

The server will start on the specified PORT in your .env file. If PORT is set to 8070, the application will be available at <http://localhost:8070>.

#### Database Migrations

```
yarn prisma migrate dev
```

### API Documentation

Visit the url below to view the documentation
`https://inventory-system-k1ek.onrender.com/api/docs`
`localhost:8070/api/docs`

### Contributing

Contributions are welcome!

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Key Points

- The `README.md` provides a comprehensive guide on setting up the project locally, including installation instructions, environment variable configuration, and starting the server.
- Since the API documentation is not yet available, it includes a placeholder indicating that it will be provided later.
- The setup instructions are tailored specifically for a Node.js and PostgreSQL environment using Yarn.

This `README.md` file should serve as a solid foundation for your project documentation. Let me know if you need any changes or additional information!
