# Grant F Barnes

This is a Node.js server with no imported UI frameworks or css. It serves as the landing page for [grantfbarnes.net](https://grantfbarnes.net). It also serves as the backend for other personal Single Page Application (SPA) sites:

- [CRM](https://github.com/GrantFBarnes/crm)
- [Learn Vietnamese](https://github.com/GrantFBarnes/learn-vietnamese)
- [Tractor Pulling](https://github.com/GrantFBarnes/tractor-pulling)
- [Vehicle Ownership Cost](https://github.com/GrantFBarnes/vehicle-ownership-cost)

## Environment Variables

You will need to set the following environment variables

```
GFB_JWT_SECRET // secret to encrypt tokens
GFB_MANAGER_SECRET // secret to allow manager access
GFB_SQL_HOST // MySQL/Maria DB host
GFB_SQL_USER // MySQL/Maria DB user
GFB_SQL_PASSWORD // MySQL/Maria DB password
```

_Note that these can change to what ever values desired for deployment._

### Node

You must have [Node.js](https://nodejs.org/) installed, then run `npm i` to install dependencies.

Run `node backend/server.js` to run the server locally.
