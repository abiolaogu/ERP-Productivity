# Drive Service

This service is responsible for managing files and folders.

## Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up the Database
This service uses PostgreSQL as its database.

1.  **Create a `.env` file** in the root of this service directory.
2.  **Add the `DATABASE_URL`** to the `.env` file. This should be a connection string for your local PostgreSQL database. For example:
    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/drive_service_dev?schema=public"
    ```
3.  **Run the database migrations** to create the necessary tables:
    ```bash
    npm run migrate
    ```

### 3. Start the Service
```bash
npm run dev
```
(Note: we will add the `dev` script in a future task)
