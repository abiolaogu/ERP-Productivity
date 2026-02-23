# Project Documentation

## 1. Introduction
Welcome to the developer documentation for our open-source productivity platform. This document provides the necessary information to get you started as a contributor, including our repository structure, coding standards, and contribution process.

## 2. Repository Structure
The project is organized into a monorepo, with each microservice residing in its own directory under the `services/` folder. The web and mobile frontends are located in the `clients/` folder.

```
/
├── clients/
│   ├── web/          # The main web application
│   └── mobile/       # The mobile application
├── services/
│   ├── identity/     # ZITADEL configuration and extensions
│   ├── chat/         # Mattermost configuration and plugins
│   └── user-onboarding-service/ # Orchestrates user onboarding
│   └── drive-service/ # Manages files and folders
│   └── ...           # Other microservices
├── docs/             # Project documentation
├── helm/             # Helm charts for deployment
└── scripts/          # Helper scripts for development and CI/CD
```

## 3. Coding Standards

### 3.1. General Principles
- **Write clean, readable, and maintainable code.**
- **Follow the principle of least astonishment.**
- **Document your code where necessary**, but strive to make the code self-documenting.

### 3.2. Language-Specific Guidelines
- **Go:** Follow the official [Effective Go](https://golang.org/doc/effective_go.html) guidelines. Use `gofmt` to format your code.
- **TypeScript/JavaScript:** Use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). Use Prettier and ESLint to enforce a consistent style.
- **Python:** Follow the [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide. Use `black` for code formatting.

## 4. Git Workflow

### 4.1. Branching Model
We use a simplified version of the GitHub Flow model:
- `main`: The main branch, which always contains production-ready code.
- `feature/<name>`: Feature branches, created from `main`. All development happens here.
- `bugfix/<name>`: Bugfix branches, created from `main`.

### 4.2. Commit Messages
We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps us to automatically generate changelogs and makes the commit history more readable.

## 5. Contribution Process

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bugfix.
3.  **Set up your development environment.** (See section 6)
4.  **Make your changes.**
5.  **Write unit and integration tests** for your changes.
6.  **Ensure all tests pass.**
7.  **Submit a pull request** to the `main` branch.
8.  **Participate in the code review process.** Address any feedback from the maintainers.
9.  **Once your pull request is approved, it will be merged into `main`.**

## 6. Setting Up a Development Environment
To get started, you will need to have Docker and Docker Compose installed.

1.  **Clone your forked repository.**
2.  **Run `docker-compose up -d`** from the root of the repository. This will start all the necessary services.
3.  **Follow the instructions in the `README.md`** of the specific service or client you want to work on.
