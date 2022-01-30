CREATE TYPE gender AS ENUM('Male', 'Female');

CREATE TYPE breed AS ENUM('Vampire', 'Werewolf');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_name VARCHAR(20) UNIQUE NOT NULL,
  gender_users gender NOT NULL,
  breed_users breed NOT NULL
);
