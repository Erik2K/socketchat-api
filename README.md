
# SocketChat API

SocketChat API is a personal learning project and side project showcase. It offers real-time chat functionality implemented with Node.js, Express.js, and Socket.IO.


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

| Variable          | Description                         | Default Value       |
|-------------------|-------------------------------------|---------------------|
| APP_ENV           | Application environment             | development         |
| PORT              | Port the app is running on          | 3000                |
| WEB_URL           | Base URL of the frontend application     | http://localhost:4200 |
| DATABASE_URI      | URI of the database                 | mongodb://localhost/socketchat |
| SALT_WORK_FACTOR | Work factor for password hashing    | 10                  |
| TOKEN_SECRET      | Secret for JWT token generation     | mysecrettoken       |
| RESEND_API_KEY    | API key for email resend service    | -                   |
| RESEND_SENDER     | Email sender address for email resend service | example@example.com |

## Releases and Features

> ## v0.1.0 (current)
> 
> - [x] SignIn, SignUp, Password recovery
> - [x] Tokken based session
> - [x] Private Chat rooms
> - [x] Search users and create new chats
> - [x] Email communication

> ## v0.2.0
> 


> ## v0.3.0
> 

> ## v0.4.0
> 

> ## v0.5.0
> 

> ## v0.6.0
> 

> ## v0.7.0
> 

> ## v0.8.0
> 

> ## v0.9.0
> 

> ## v1.0.0
> 
> - [ ] Stable version with all core features implemented and ready for production use
