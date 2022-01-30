CREATE TABLE gender(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO gender(name) VALUES ('Male');
INSERT INTO gender(name) VALUES ('Female');

CREATE TABLE breed(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO breed(name) VALUES ('Vampire');
INSERT INTO breed(name) VALUES ('Werewolf');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  breed CHAR(1),
  gender CHAR(1),
  CONSTRAINT breed_check CHECK (breed IN ('V', 'W')),
  CONSTRAINT gender_check CHECK (breed IN ('M', 'F'))
);

COMMENT ON COLUMN users.breed IS 'V = Vampire, W = Werewolf';
COMMENT ON COLUMN users.gender IS 'M = Male, F = Female';
