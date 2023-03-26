# Social Media Dashboard

Social Media Dashboard for Roc8 Moonshot Test

## Prerequisites

- Docker
- Postman (optional)

## Running the application locally with Docker

To run the application locally using Docker, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal in the root directory of the project.
3. Run `cd backend` and copy the contents of `.env.example` file to `.env` and replace relevant environment variables
4. Run the following command to build the Docker image:
```shell
docker compose build
```

5. Run the following command to start the Docker container:
```shell
docker compose up --remove-orphans
```
6. The application will be available at `http://localhost/:5000` or `http://localhost/:{PORT}` where value of PORT is the value of env variable `PORT`.

## Postman Collections

To test the application using Postman, import the following collection and environment:

- [SMD.postman_collection.json](https://github.com/shubham-y/social-media-dashboard/blob/main/backend/SMD.postman_collection.json)
- [SMD.postman_environment.json](https://github.com/shubham-y/social-media-dashboard/blob/main/backend/SMD.postman_environment.json)

The collection is also published at https://documenter.getpostman.com/view/16407419/2s93RNzabh

## Contributing

Contributions to this project are welcome. Please open an issue or submit a pull request if you notice any bugs or have suggestions for improvement.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).






