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

Run the following command to create the default database:

```
npx sequelize-cli db:migrate
```

This will create a sqlite database on ``db/`` with the name ``database.sqlite``.

## Running application

In the folder ``/api`` run:

```
yarn start
```

A server will start in the localhost on port 80 (by default)
