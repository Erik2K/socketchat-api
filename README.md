
# SocketChat API

SocketChat is a personal learning project and side project showcase. It offers real-time chat functionality implemented with Node.js, Express.js, and Socket.IO.


## Run Locally

Clone the project

```console
git clone https://github.com/Erik2K/socketchat-api
```

Go to the project directory

```console
cd socketchat-api
```

Install dependencies

```console
npm install
```

Start the server

```console
npm run dev
```

## Environment vars

This project uses the following environment variables:

| Variable          | Description                                   | Default Value                  |
|-------------------|-----------------------------------------------|--------------------------------|
| APP_ENV           | Application environment                       | development                    |
| PORT              | Port the app is running on                    | 3000                           |
| WEB_URL           | Base URL of the frontend application          | http://localhost:4200          |
| DATABASE_URI      | URI of the database                           | mongodb://localhost/socketchat |
| SALT_WORK_FACTOR  | Work factor for password hashing              | 10                             |
| TOKEN_SECRET      | Secret for JWT token generation               | mysecrettoken                  |
| RESEND_API_KEY    | API key for email resend service              | -                              |
| RESEND_SENDER     | Email sender address for email resend service | example@example.com            |
