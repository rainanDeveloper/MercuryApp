# Mercury App

Free E2EE Diffie-Hellman Messenger App

## Installation

Clone the repository:

```
git clone https://github.com/rainanDeveloper/MercuryApp.git
```

Enter the directory

```
cd MercuryApp
```

Enter the ``app`` directory edit ``api/.env`` file, with the following structure:

```
DB_USER=[database_user]
DB_PASS=[database_password]
DB_HOST=[database_host]
DB_PORT=[database_port]
DB_DIALECT=[database_dialect]
MAILER_HOST=[smtp_email_host]
MAILER_PORT=[smtp_email_port]
MAILER_USER=[smtp_email_user]
MAILER_PASS=[smtp_email_password]
MAILER_SECURE=[use_tls]
APPLICATION_MAIL=[email]
APP_SECRET=[random_secret]
```

if you do not configure the ``DB_HOST`` variable, it will be the default value ``localhost``, the same will happen with the defaults to ``DB_PORT`` and ``DB_DIALECT``, wich will be ``3306`` and ``mysql`` respectivelly.

Now you run:

```
yarn build
```

## Running application

On the root folder, run:

```
yarn start
```

A server will start in the localhost on port 80 (by default)
