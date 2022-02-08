CREATE TYPE gender_users AS ENUM('Male', 'Female');
CREATE TYPE breed_users AS ENUM('Vampire', 'Werewolf');
CREATE TYPE role_users AS ENUM('Admin', 'User');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(20) UNIQUE NOT NULL,
  gender gender_users NOT NULL,
  breed breed_users NOT NULL,
  role role_users DEFAULT 'User' NOT NULL
);
INSERT INTO
  users (
    email,
    password,
    name,
    gender,
    breed
  )
VALUES(
    'test1@test.com',
    '$2b$10$WCq8IN5ENqxOurA.l7vzwedBbEVwYmDM8E/le7Y2WlsUg0vNpKCZy',
    'test1',
    'Male',
    'Werewolf'
  );
