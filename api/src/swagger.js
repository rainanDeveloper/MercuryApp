import {config} from 'dotenv';

config({
  path: '.env',
});

export default {
  openapi: "3.0.0",
  info: {
    title: `${process.env.APP_NAME} API`,
    version: process.env.APP_VERSION,
    description:
    process.env.APP_DESCRIPTION,
    license: {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  host: "localhost:8080",
  schemes: ["http"],
};