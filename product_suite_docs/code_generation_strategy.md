# Code Generation Strategy

## 1. Introduction
To enhance developer productivity, ensure consistency, and reduce boilerplate code, we will employ a strategic approach to code generation throughout the platform. This document outlines the key areas where code generation will be used and the tools we will leverage.

## 2. Core Principles
- **Don't Repeat Yourself (DRY):** Automate the creation of repetitive code structures.
- **Single Source of Truth:** Generate code from a single, authoritative source, such as an API definition or a database schema.
- **Consistency:** Ensure that generated code follows our established coding standards.
- **Extensibility:** The code generation process should be customizable to accommodate project-specific needs.

## 3. Key Areas for Code Generation

### 3.1. API Clients and Server Stubs
- **Source of Truth:** [OpenAPI 3.0](https://swagger.io/specification/) or [gRPC](https://grpc.io/docs/what-is-grpc/core-concepts/) definitions.
- **Generation:** For each microservice, we will maintain an API definition file. From this file, we will automatically generate:
  - **Server-side stubs/skeletons:** The basic boilerplate for the API implementation in the service's native language (e.g., Go, Python).
  - **Client-side SDKs:** Type-safe client libraries for all supported languages (TypeScript, Go, Python, etc.) to facilitate communication between services and with the frontend.
- **Tools:**
  - **OpenAPI:** [oapi-codegen](https://github.com/deepmap/oapi-codegen) (Go), [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) (TypeScript).
  - **gRPC:** The standard `protoc` compiler with language-specific plugins.

### 3.2. Database Access Layer (ORM)
- **Source of Truth:** Database schema definition (e.g., a SQL file or a high-level schema definition language).
- **Generation:** We will generate a type-safe Object-Relational Mapping (ORM) layer that handles the interaction between our services and the PostgreSQL database. This will include:
  - **Data models/structs:** Representing the database tables.
  - **CRUD operations:** Basic create, read, update, and delete functions.
  - **Database migration files.**
- **Tools:**
  - **Go:** [SQLBoiler](https://github.com/volatiletech/sqlboiler) or [Ent](https://entgo.io/).
  - **Python:** [SQLAlchemy](https://www.sqlalchemy.org/) with code generation extensions.

### 3.3. Frontend Components and Type Definitions
- **Source of Truth:** GraphQL schema or OpenAPI definitions.
- **Generation:** To ensure type safety between the frontend and backend, we will generate:
  - **TypeScript type definitions** for all API responses.
  - **React hooks and components** for data fetching (e.g., using React Query or Apollo Client).
- **Tools:**
  - [GraphQL Code Generator](https://www.graphql-code-generator.com/).

## 4. Integration into the Development Workflow
- **Automation:** Code generation will be integrated into our CI/CD pipeline. The generated code will be committed to the repository to ensure that developers can work without needing to run the code generation tools locally.
- **Customization:** The generated code will be treated as a starting point. Developers can and should extend it with custom logic. We will use patterns (e.g., partial classes, embedding) that allow for the extension of generated code without modifying the original generated files.
- **Review Process:** Changes to the source-of-truth files (e.g., API definitions) will be carefully reviewed during the code review process, as they will have a wide-ranging impact on the codebase.
