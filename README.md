# Origami Box

Origami templates to create paper boxes. Perfect for board games, but not only.

## Development

This project is built with Javascript using **React**, leveraging **Azure Functions** and **Node.js** for API and **MongoDB** for storage.

### Pre-requisities

| tool                                                                          | website                                                              |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`node 14`](https://nodejs.org/)                                              | Core engine for the project. Azure functions require the LTS version |
| [`.NET 5`](https://dotnet.microsoft.com/download)                           | Used to run the apis via azure functions                             |
| [`yarn`](https://yarnpkg.com/)                                                | Used for front-end dependencies and scripts                          |
| [`docker` / `docker-compose`](https://www.docker.com/)                        | Used for the additional module (mongodb and azure functions)         |
| [`azure functions`](https://www.npmjs.com/package/azure-functions-core-tools) | Used for the api                                                     |

### Scripts

| scripts          | usage                                                                         |
| ---------------- | ----------------------------------------------------------------------------- |
| `yarn start`     | Runs the front-end in the development mode (with auto-reload and lint errors) |
| `yarn local:db`  | Starts the mongodb server for local development using docker                  |
| `yarn local:api` | Starts the Azure Function Apis for local development (with auto-reload)       |
| `yarn local`     | starts both mondb and the apis for local development                          |

### First Steps

- Run `yarn` to confirm npm and yarn installation as well installed core dependencies
- Run `cd api && npm install` to prepare the apis by retrieving their dependencies
- Create a `.env.local` file to provide the `REACT_APP_FACEBOOK_APPID` for the local development
- Copy `api/default.settings.json` to `api/local.settings.json` and provide the facebook api information
- Run `yarn local:db` to confirm that docker is installed and working properly
- Run `yarn local:api` to confirm that azure functions cli is installed
- Run `yarn start` to confirm that the application is running

## Packaging and Deployment

The `master` branch is automatically deployed on Azure as a Static Web App.

## License

The source code of this project is released under the [MIT](LICENSE) license.
