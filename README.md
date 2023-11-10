# Cotation App

## Description

This is a full-stack web application using FastAPI, React, and PostgreSQL. The project is dockerized using Docker Compose for easy development and deployment.

## Project Structure

- `backend/`: Contains all files related to the FastAPI backend.
- `frontend/`: Includes all files for the React frontend.
- `.env.example`: Example environment file. Copy this to `.env` and fill in the required values.
- `docker-compose.yaml`: Docker Compose file for orchestrating the services.

## Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. Navigate to the project directory:

    ```bash
    cd project-name
    ```

Update the .env file with your configuration.

3. Build and start the services with Docker Compose:

    ```bash
    docker-compose up --build
    ```

This will build the Docker images and start the containers.

Access the backend API at http://localhost:8000 and the frontend app at http://localhost:3000.

## Stopping the Services

To stop the services, use the following command:

    ```bash
    docker-compose down
    ```   
