# Grant F Barnes

This is a Node.js server with no imported UI frameworks or css. It serves as the landing page for [grantfbarnes.net](http://grantfbarnes.net). It also serves as the backend for other personal Single Page Application (SPA) sites:

- [Learn Vietnamese](https://github.com/GrantFBarnes/learn-vietnamese)
- [Tractor Pulling](https://github.com/GrantFBarnes/tractor-pulling)
- [Vehicle Ownership Cost](https://github.com/GrantFBarnes/vehicle-ownership-cost)

This site can be either run with or without a container. Instructions on how to do each are below.

## Container Setup

This site can be run in a [podman](https://podman.io/)/[docker](https://www.docker.com/) container. Install and setup one on your machine.

### Database Setup

In order to support some of the other projects a SQL database is needed. To create and run a mariadb container, use the following where you replace the environment variables with desired values:

```
podman run --detach \
    -p 3306:3306 \
    -e MARIADB_ROOT_PASSWORD=MARIADB_ROOT_PASSWORD \
    --name mariadb \
    mariadb:latest
```

You can populate the database with a SQL backup by running the following:

```
podman exec -i mariadb sh -c 'exec mysql -uroot -p"$MARIADB_ROOT_PASSWORD"' < backup.sql
```

You can generate a new backup of the specified `database_name` by running the following:

```
podman exec mariadb sh -c 'exec mysqldump database_name -uroot -p"$MARIADB_ROOT_PASSWORD"' > backup.sql
```

### Node.js Setup

The [Dockerfile](Dockerfile) will download Node.js, create a directory for each project, install all dependencies, and run all builds.

Have all projects at the same level in a directory, then from that parent directory run the following to build the image:

```
podman build -t home-page -f home-page/ .
```

To run the image, use the following where you replace the environment variables with desired values:

```
podman run --detach \
    -p 8080:8080 \
    --network host \
    -e GFB_HOSTING_ENV='GFB_HOSTING_ENV' \
    -e GFB_EDIT_SECRET='GFB_EDIT_SECRET' \
    -e JWT_SECRET='JWT_SECRET' \
    -e SQL_TU_PASSWORD='SQL_TU_PASSWORD' \
    --name home-page \
    home-page
```

## Non-container Setup

### Database Setup

In order to support some of the other projects a SQL database is needed. Install [MariaDB](https://mariadb.org/) on your system.

You can populate the database with a SQL backup by running the following:

```
mariadb -u root < backup.sql
```

You can generate a new backup of the specified `database_name` by running the following:

```
mariadb-dump database_name > backup.sql
```

### Environment Variables

You will need to set the following environment variables

```
GFB_HOSTING_ENV // prod or something else
GFB_EDIT_SECRET // secret to allow edit access
JWT_SECRET // secret to encrypt tokens
SQL_TU_PASSWORD // MySQL/Maria DB trusted user password
```

_Note that these can change to what ever values desired for deployment._

### Node

You must have [Node.js](https://nodejs.org/) installed, then run `npm i` to install dependencies.

Run `node backend/server.js` to run the server locally.

Run `pm2 start backend/server.js` to run the server in production.
