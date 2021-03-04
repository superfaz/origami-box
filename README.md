# Origami Box

Origami templates to create paper boxes. Perfect for board games, but not only.

## Development

This project is built with Javascript using **React**, leveraging **Azure Functions** and **Node.js** for API and **MongoDB** for storage.

### Pre-requisities

| tool | website |
|------|---------|
| [`yarn`](https://yarnpkg.com/) | Used for front-end dependencies and scripts |
| [`docker` / `docker-compose`](https://www.docker.com/) | Used for the additional module (mongodb and azure functions) |

### Scripts

| scripts | usage |
|---------|-------|
| `yarn start` | Runs the front-end in the development mode (with auto-reload and lint errors) |
| `yarn local:db` | Starts the mongodb server for local development using docker |
| `yarn local:api` | Starts the Azure Function Apis for local development (with auto-reload) |
| `yarn local` | starts both mondb and the apis for local development |

## Packaging and Deployment

The `master` branch is automatically deployed on Azure as a Static Web App.

## License

The source code of this project is released under the [MIT](LICENSE) license.
