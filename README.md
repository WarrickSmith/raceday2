# RaceDay2

## Overview

RaceDay2 is a comprehensive racing information system that provides real-time data on race meetings, races, and runners. This project consists of a server application that fetches, processes, and serves racing data through a RESTful API.

## Key Technologies

### Server Application

- Bun: JavaScript runtime and package manager
- Elysia: Web framework for building APIs
- MongoDB: Database for storing racing data
- Mongoose: ODM for MongoDB
- Swagger/OpenAPI: API documentation
- Docker: Containerization for easy deployment

### Client Application (Future Development)

[Placeholder for client application technologies]

## Installation and Setup

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/raceday2.git
   cd raceday2/server
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory and add the following:

   ```bash
   PORT=5020
   NZ_TAB_URL=https://json.tab.co.nz/schedule/
   MONGODB_URI=mongodb://localhost:27017/raceday2
   ```

4. Start the development server:

   ```bash
   bun run dev
   ```

5. Access the API at `http://localhost:5020` and the Swagger documentation at `http://localhost:5020/docs`

### Docker Deployment

1. Build the Docker image:

   In the root directory, run:

   ```bash
   docker compose up --build -d
   ```

   Note: Adjust the MONGODB_URI as needed for your MongoDB setup.

## Testing

Run the test suite:

```bash
bun test
```

## API Documentation

Detailed API documentation is available through Swagger UI. After starting the server, visit `http://localhost:5020/docs` in your browser.

## Contributing

Contributions to this project are welcome. Please follow these guidelines:

1. Fork the repository and create your branch from `main`.
2. Write clear and concise commit messages.
3. Ensure your code adheres to the existing style.
4. Add or update tests as necessary.
5. Update documentation for any changed functionality.
6. Submit a pull request with a comprehensive description of changes.

## License

This project is private and for personal use only. All rights reserved. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.
