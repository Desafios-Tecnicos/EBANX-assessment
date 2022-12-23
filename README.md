
# Description

This is an API created to the EBANX technical assessment, forked from  my personal boilerplate. All unecessary features had been removed, so, if you want to know a little more about the boilerplate, visit the original boilerplate (https://github.com/PratesJr/nest-js-scaffold)


## System Requirements

- _Node_: version >= 16.16
- _NPM_: version >= 8.11
- _NestJs_: >= 9.0.0
- _Docker_: version >= 20.10
- _Docker Compose_: version >= 1.29

## Installation

```bash
npm install
```

```bash
touch .env && cp .env.example .env
```

## Important

the cache-manager package is not working well in the latest version, so please verify on your package.json that the version is ^4.0.0

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Marcelo Prates] - mpratesjunior@gmail.com

## License

Nest is [MIT licensed](LICENSE).
