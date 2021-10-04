-- migrate:up
create schema app_public;

create table app_public.companies (
  id serial primary key,
  name text not null
);

create table app_public.users (
  id serial primary key,
  name text not null,
  company_id int not null references app_public.companies
);
create index on app_public.users(company_id);

create table app_public.dishes (
  id serial primary key,
  name text not null,
  description text,
  image_url text,
  price_in_sek int not null,
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

insert into app_public.companies (name) values ('Lord of the Wings');
insert into app_public.users (name, company_id) values ('Frodemo', 1);
insert into app_public.dishes (name, description, image_url, price_in_sek, company_id) values (
    'Chicken Wings',
    'The juiciest, crunchiest wings you''ll find this side of the Atlantic. Yum yum yum.',
    'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg', 
    125,
    1
  ), 
  (
    'Tacos',
    'They call these tacos the mana of gods. Be careful... one bite and you can never go back.',
    'https://images.pexels.com/photos/8448325/pexels-photo-8448325.jpeg',
    90,
    1
  ), (
    'Eggs',
    'Yes, eggs. No, there''s nothing special about them. Stop asking so many questions.',
    'https://images.pexels.com/photos/2959303/pexels-photo-2959303.jpeg',
    50,
    1
  );
insert into app_public.orders (user_id, dish_id) values (1, 1);

-- migrate:down
drop schema app_public cascade;