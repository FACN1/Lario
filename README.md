# KITTY.IO

#### A CMS (content management system) app that keeps track of the kitty for the guest house.

Find us on [Heroku](https://lario.herokuapp.com/)...

...or run locally:
```bash
git clone https://github.com:FACN1/Lario.git
cd Lario
npm install
npm start
```

## User Stories
**As an honest resident of the guesthouse**
> I want to be able to record my contributions to the kitty

> So that I can maintain the respect of my peers

**As a member of Founders and Coders, who wants to learn from my fellow devs**
> **I want to** log in with my Github account.

>**So that** I can use my Github organisation's info to see the kitty's transactions.

**As any user who is logged in**
>**I want to** see my username & Github profile picture on the homepage.

>**So that** I benefit from logging in with Github OAuth, and don't have to do any profile setup on your site.



## File Structure
Lario
- public/
  + style.css
- src/
  + handlebars/
    + helpers/
    + layouts/
    + partials/
    + views/
  + routes/
  + db_queries.js
  + server.js
  + start.js
- database/
  + db_build.js (initialize database with db_build.sql)
  + db_build.sql (create database SQL syntax)
  + db_connection.js (database connection parameters)
- tests/
  + back-end/
    + tests.js

## App Logic
- User Interface:
  - Main: go to the login page to log-in through github
  - Then go to the page and automatically render the last `n` transactions, and the total in the kitty
  - Update: takes you to a form to add to or withdraw money from the kitty

## Database Schema

| ID  | DATE | NAME | TRANSACTION_VALUE |
| ------------- | ------------- | ------------- | ------------- |
| SERIAL PRIMARY KEY | DATE DEFAULT CURRENT_DATE  |  VARCHAR(200) NOT NULL  |  INT NOT NULL
