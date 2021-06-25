# Mercury App

Free E2EE Diffie-Hellman Messenger App

## Installation

Clone the repository:

```
git clone https://github.com/rainanDeveloper/MercuryApp.git
```

Enter the directory and build the application

```
cd MercuryApp
```

Enter the ``app`` directory and install dependencies:

```
yarn install
```

Then do the same on the ``api`` folder:

```
yarn install
```

## Installing the Database

On the api directory, create ``.env`` file:

```bash
touch .env
```

Edit the ``.env`` file and add the following lines:

```ini
DB_STORAGE_FILE=src/db/database
DB_DIALECT=sqlite
```

## Running application

In the folder ``/api`` run:

```
yarn start
```

A server will start in the localhost on port 80 (by default)
