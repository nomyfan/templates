DROP TABLE IF EXISTS person
;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE CHECK( username <> ''),
    display_name VARCHAR(100) NOT NULL CHECK ( display_name <> '')
)
;
