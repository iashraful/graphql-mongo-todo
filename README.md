# graphql-mongo-todo
> A todo app with NodeJS, MongoDB, Apollo, GraphQL and React

### Run the project using Docker[`docker-compose`]
* Navigate to `cd server/src/config`
* Copy the `database.js.example` file and Update the copied name without `.example`
* Update your database name and host 
* `docker-compose up` use `-d` for detached mode.

### How to run for development [Tradinational approch]
* Navigate to `cd server/src/config`
* Copy the `database.js.example` file and Update the copied name without `.example`
* Update your database name and host 
* Run `./run.sh`

### Run using Docker Compose
* Navigate to `cd server/src/config`
* Copy the `database.js.example` file and Update the copied name without `.example`
* Update your database name and host 
* Run `docker-compose up --build -d`

Your apps will be running on 5000(Server) and 3000(Client) ports. Enjoy :)
