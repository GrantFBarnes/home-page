# Grant F Barnes

This is Node.js server with no imported UI frameworks or css. Landing page for grantfbarnes.net site. It also serves as the backend for other personal Single Page Application (SPA) sites.

## Prerequisites

### Environment Variables

You will need to set the following environment variables

```
JWT_SECRET // secret to encrypt tokens
GFB_EDIT_SECRET // secret to allow edit access
GFB_HOSTING_ENV // prod or something else
SQL_TU_PASSWORD // MySQL/Maria DB trusted user password
```

_Note that these can change to what ever values desired for deployment._

### Node

Have Node.js installed, then run `npm i` to install dependencies.

## Run

### Development

Run `node backend/server.js` to run the server locally.

### Production

Run `pm2 start backend/server.js` to run the server in production.
