
# Cocktail Recipe App

This is a code bundle for Cocktail Recipe App. The original project is available at https://www.figma.com/design/0iFiiHpD2NnttiXy8d6Cnn/Cocktail-Recipe-App.

## Development Setup

### Using Dev Container (Recommended)

This project includes a dev container configuration for a consistent development environment.

**Prerequisites:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Docker Compose)
- [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

**Getting Started:**
1. Open the project in VS Code
2. When prompted, click "Reopen in Container" (or press `F1` and select "Dev Containers: Reopen in Container")
3. Wait for the container to build and dependencies to install
4. The dev server will be available on port 3000 (automatically forwarded)

**Note:** The `postCreateCommand` will automatically run `npm install` when the container is first created.

### Local Development

If you prefer to develop locally without a dev container:

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
  