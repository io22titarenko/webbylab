CREATE ROLE postgres LOGIN
  ENCRYPTED PASSWORD 'md54b5431481e4015085e9465ea54b23062'
  SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION;

CREATE DATABASE postgres
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Russian_Ukraine.1251'
       LC_CTYPE = 'Russian_Ukraine.1251'
       CONNECTION LIMIT = -1;

COMMENT ON DATABASE postgres
  IS 'default administrative connection database';


CREATE SCHEMA public
  AUTHORIZATION postgres;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
COMMENT ON SCHEMA public
  IS 'standard public schema';


DROP TABLE IF EXISTS public.films;
CREATE TABLE public.films
(
  id serial primary key,
  title varchar not null,
  year  integer not null,
  format varchar not null,
  stars text[] not null,
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.films
  OWNER TO postgres;