-- migrate:up
create schema app_public;

create table app_public.companies (
  id serial primary key,
  name text not null
);

create table app_public.users (
  id serial primary key,
  name text not null,
  company_id int not null references app_public.companies on delete cascade
);
create index on app_public.users(company_id);

create table app_public.dishes (
  id serial primary key,
  name text not null,
  description text,
  image_url text,
  price_in_sek int not null,
  company_id int not null references app_public.companies on delete cascade
);
create index on app_public.dishes(company_id);

create table app_public.orders (
  user_id int not null references app_public.users on delete cascade,
  dish_id int not null references app_public.dishes on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, dish_id, created_at)
);
create index on app_public.orders(dish_id);
create index on app_public.orders(created_at);

create function app_public.companies_orders(company app_public.companies) returns setof app_public.orders as $$
  select orders.* 
  from app_public.orders orders
  inner join app_public.dishes dishes on dishes.id = orders.dish_id
  inner join app_public.companies companies on dishes.company_id = companies.id
  where companies.id = company.id;
$$ language sql stable;
comment on function app_public.companies_orders(company app_public.companies) is E'@sortable';

insert into app_public.companies (name) values ('Lord of the Wings');
insert into app_public.users (name, company_id) values ('Frodemo', 1);
insert into app_public.users (name, company_id) values ('Gandemodalf', 1);
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
    'Candy',
    'Tasty treats from last year''s Halloween. The kids we took it from had had more than enough anyway.',
    'https://images.pexels.com/photos/5477991/pexels-photo-5477991.jpeg',
    65,
    1
  ), (
    'Chips',
    'We bought these at City Gross and sprinkled some wholesale hot sauce on top. Now pay up!',
    'https://images.pexels.com/photos/568805/pexels-photo-568805.jpeg',
    80,
    1
  ), (
    'Eggs',
    'Yes, eggs. No, there''s nothing special about them. Stop asking so many questions.',
    'https://images.pexels.com/photos/2959303/pexels-photo-2959303.jpeg',
    50,
    1
  );
insert into app_public.orders (user_id, dish_id) values (2, 1), (1, 2), (1, 1), (2, 4);

-- migrate:down
drop schema app_public cascade;