<div align="center">
  <img src="./template/static/img/nuxt-vuetify.png" width="128px">
  <h1>Nuxt Vuetify Boilerplate</h1>
</div>

<p align="center">
  Nuxt Vuetify Boilerplate is a <a href="https://vuetifyjs.com/">Vuetify</a> and <a href="https://github.com/nuxt/nuxt.js">Nuxt.js</a> boilerplate with a lot of features to start development your future projects faster.
</p>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/guastallaigor/hare/master/LICENSE)

## Features

* [Pugjs](https://pugjs.org/api/getting-started.html)
* [Stylus](http://stylus-lang.com/)
* [Docker](https://github.com/docker)
* [Express](https://github.com/expressjs/express)
* [Axios](https://github.com/nuxt-community/axios-module)
* [Vue-Swal](https://github.com/anteriovieira/vue-swal)
* [Rupture](https://github.com/jescalan/rupture)
* [Cordova](https://cordova.apache.org/)
* .Env configuration
* CRUD example

## How to use

It's recommended that you use `docker-compose`. The commands commonly used are:

1. `docker-compose run node sh` (Enter inside the docker container);
2. `docker-compose up node` (Up container);
3. `docker-compose up down` (Drop container);

Also, it's better to run all npm's commands inside the container.

## Cordova - App

To generate the cordova build, just follow this steps:

1. Enter in the docker container with `docker-compose run node sh`;
2. Run `npm run cordova`;
3. Wait until it's finished, then check if the `cordova` folder has been created on the root project directory.

#### Code Style Recommended

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### TODO

* [X] Add CRUD example.
* [X] Add docker-compose.yml.
* [X] Add axios examples.
* [ ] Add more Store examples.
* [ ] Add more dependencies.
* [ ] Add open API to replace mockAPI.

## License

MIT © [guastallaigor](https://github.com/guastallaigor/nuxt-boilerplate)
