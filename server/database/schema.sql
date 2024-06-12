CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(80),
  lastname VARCHAR(80),
  password VARCHAR(80),
  pseudo VARCHAR(80),
  image_Profile BLOB,
  email VARCHAR(80),
  isAdmin BOOLEAN,
  comment_Quantity INT,
  ingredient_id INT
);

CREATE TABLE recipe (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  number_Of_People INT,
  description TEXT,
  image BLOB,
  date DATE,
  is_Favorite BOOLEAN,
  vote INT,
  set_up_time INT,
  is_Validated BOOLEAN,
  user_id INT,
  badge_id INT
);

CREATE TABLE ingredient (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  image_Profile BLOB,
  calories INT,
  proteins INT,
  carbohydrates INT,
  sugar INT,
  lipids INT,
  salt INT,
  fiber INT
);

CREATE TABLE menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE
);

CREATE TABLE comment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE,
  user VARCHAR(255),
  description TEXT,
  is_Validated BOOLEAN,
  user_id INT,
  recipe_id INT
);

CREATE TABLE badge (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80),
  description VARCHAR(255)
);

CREATE TABLE label (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  image BLOB,
  description TEXT
);

CREATE TABLE user_menu_recipe (
  id INT PRIMARY KEY AUTO_INCREMENT,
  recipe_id INT,
  user_id INT,
  menu_id INT
);

CREATE TABLE badge_user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  badge_id INT,
  user_id INT,
  date DATE
);

CREATE TABLE recipe_label (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label_id INT,
  recipe_id INT
);

CREATE TABLE recipe_ingredient (
  id INT PRIMARY KEY AUTO_INCREMENT,
  recipe_id INT,
  ingredient_id INT,
  quantity INT
);