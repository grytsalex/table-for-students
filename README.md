
Download the program  - https: //nodejs.org/uk/
Installation instructions for different systems https://nodejs.org/en/download/package-manager/

---------------------------------
Install Database:
on Windows - https://info-comp.ru/sisadminst/684-install-postgresql-11-on-windows.htmlhttps://info-comp.ru/sisadminst/684-install-postgresql-11-on-windows .html
on Linux - https://www.digitalocean.com/community/tutorials/postgresql-ubuntu-16-04-ru
on MacOs - https://golosay.net/install-postgresql-on-mac-os/
during installation, click Next all the time
typeof password

Open pgAdmin File
* create database with 'your name'
* create table 'students' with columns:

    1. id bigint primary key
    2. name char 15 NOT NULL
    3. last_name char 15 NOT NULL
    4. age bigint 15 NOT NULL
    5. city char 15 NOT NULL
---------------------------

Install git https://git-scm.com/

--------------
Install the libraries used in the project:
Open terminal --->
In the terminal, specify the path to the repository and write the command> npm install
to install automatic server updates also in the terminal register> npm install -g nodemon
then write the command> npm install --save-dev nodemon
start the server with the command> nodemon index

----------------
Open index.html file in browser



