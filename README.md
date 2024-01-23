## Description
Simple news REST API allowing records to be filtered. As a tech stack is uses `Docker`, `MongoDB` and it's `native driver` for `Node.js`, `Koa`, `TypeScript`, `Jest` for testing and `docker-compose` for running the application.

## Requirements
* Use the tech stack from above.

* The news entitiy must contain the following information: `id`, `date`, `title`, `short description`, `text``.

* All requests and responses should be in JSON.
* Requests validation.

* API results must be sortable by date and/or title.

* API results must be filterable by date and/or title.


## Setup

* Install Docker on your operating system:
https://docs.docker.com/engine/install/

* Start Docker Desktop (Windows and macOS) or Docker daemon (Linux).

* Clone this repo.

* Navigate to the root folder of the project (it has the `docker-compose.yml` file in it).

* Run ```cp .env.example .env ```

* Edit the `.env` file and place your credentials.

* Run ```docker-compose up```.
First time running will take a few minutes of setup. when it's you should see the following messag in the terminal: `Finished building. Server is up.`

# Start

* Start Docker Desktop (Windows and macOS) or Docker daemon (Linux).

* Run ```docker-compose up```.

* You don't have to run the command directly after the setup since it's already executing the command (unless you've stopped it for some reason).


## Preview

* After running the ```docker-compose up``` command and wait for the setup to finish you can access the app on the browser by visiting this url: `http://localhost:3003/`

* If you need port changes for the mongo or Node.JS containers modify the `docker-compose.yaml` file.


## SSH into the Node.JS container:
* Run `docker exec -it node_js_server /bin/bash`
    - or alternatively use Docker Desktop's interface (for Windows and macOS) to ssh into the container.


## Tests

Tests are located in the `news_api/tests` folder.

To run tests:
* SSH into the Node.JS container (look at the previous point on how to do that).

* Run: ```npm run test``` inside the SSH.


## Requests Examples

* For requests example you can check the file `news_api/request-sending.txt`. 

* You can run the requests in the browser console.


## Connect To MongoDB:


* SSH into the MongoDB container by running:<br>
`docker exec -it mongo_db /bin/bash`
    - or alternatively use Docker Desktop's interface (for Windows and macOS) to ssh into the container.

* Afterwards run <br>`mongosh "mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017"`

* Select the database you wish to use (must match with the `MONGO_INITDB_DATABASE` parameter from the `.env` file): <br>
`use news_db`

* Perform any query you want to:
    - `db.news.find()`
    - `db.requests_processings.find()`

Alternatively you can connect using `mongosh` inside any terminal you wish to. Just make sure you install the package.

