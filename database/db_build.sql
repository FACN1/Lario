BEGIN;

DROP TABLE IF EXISTS transactions cascade;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  TDate DATE DEFAULT CURRENT_DATE,
  name VARCHAR(200) NOT NULL,
  value INT NOT NULL
);

INSERT INTO transactions (name, value)
VALUES
('Mario', 25), ('Edgar', 25), ('Eoin', -50);

COMMIT;
