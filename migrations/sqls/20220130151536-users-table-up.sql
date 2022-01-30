CREATE TYPE gender AS ENUM('Male', 'Female');

CREATE TYPE breed AS ENUM('Vampire', 'Werewolf');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  gender_users gender NOT NULL,
  breed_users breed NOT NULL
);
