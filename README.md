![DEVil Editor](./docs/main_logo6.png) <br>

# DEVIL EDITOR
## Overview

Devil Editor is an entirely web-based Integrated Development Environment (IDE) that enables users to write, edit, and execute code directly from a web browser without needing to install any compilers or development software.

## Key Features

- **Code Editor:** Supports multiple programming languages with syntax highlighting, auto-completion, and error checking.
- **Terminal Access:** Built-in bash terminal providing access to a Linux (Ubuntu) environment.
- **Containerized Workspace:** Each project operates in an isolated Docker container for a consistent development environment.
- **Dashboard Management:** Intuitive dashboard for creating projects, managing environments, and launching workspaces.
- **JWT Authentication:** Secure user registration and login using JWT tokens.
- **Google Sign-In:** Simplifies login with the option to use Google accounts.

## Dependencies

- `Node v20.15`
- `Docker 26.1.0`

## Setup and Usage
### Starting the Workspace
For detailed steps on building and starting the workspace Docker image, see the [workspace server README.md](./pr6-cloud-ide-server/README.md).

### Starting the Backend
To build and run the backend server, refer to the [backend README.md](./pr6-cloud-ide-server/README.md).

### Starting the Frontend
Instructions for building and running the frontend server are available in the [frontend README.md](./pr6-cloud-ide-server/README.md).