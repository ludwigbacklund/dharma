-- migrate:up
create schema app_public;

create table app_public.companies (
  id serial primary key,
  name text
);

create table app_public.users (
  id serial primary key,
  name text,
  company_id int not null references app_public.companies
);
create index on app_public.users(company_id);

create table app_public.dishes (
  id serial primary key,
  name text,
  company_id int not null references app_public.companies
);
create index on app_public.dishes(company_id);

create table app_public.orders (
  user_id int not null references app_public.users,
  dish_id int not null references app_public.dishes,
  created_at timestamptz not null default now(),
  primary key (user_id, dish_id)
);
create index on app_public.orders(dish_id);

insert into app_public.companies (name) values ('Dharma AB');
insert into app_public.users (name, company_id) values ('Ludwig', 1);
insert into app_public.dishes (name, company_id) values ('Chicken Tikka', 1);
insert into app_public.orders (user_id, dish_id) values (1, 1);

-- migrate:down
drop schema app_public cascade;