CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(80),
  lastname VARCHAR(80),
  password VARCHAR(80),
  pseudo VARCHAR(80),
  image_profile BLOB,
  email VARCHAR(80),
  is_admin BOOLEAN,
  comment_quantity INT,
  ingredient_id INT,
  FOREIGN KEY (ingredient_id) REFERENCES ingredient (ingredient_id)
);

CREATE TABLE recipe (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  number_of_people INT,
  description TEXT,
  image BLOB,
  date DATE,
  is_favorite BOOLEAN,
  vote INT,
  set_up_time INT,
  is_validated BOOLEAN,
  user_id INT,
  badge_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (badge_id) REFERENCES badge(id)
);

CREATE TABLE ingredient (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  category VARCHAR(255),
  image_profile BLOB,
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
  is_validated BOOLEAN,
  user_id INT,
  recipe_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id)
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
  menu_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (menu_id) REFERENCES menu(id)
);

CREATE TABLE badge_user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  badge_id INT,
  user_id INT,
  date DATE,
  FOREIGN KEY (badge_id) REFERENCES badge(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE recipe_label (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label_id INT,
  recipe_id INT,
  FOREIGN KEY (label_id) REFERENCES label(id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE recipe_ingredient (
  id INT PRIMARY KEY AUTO_INCREMENT,
  recipe_id INT,
  ingredient_id INT,
  quantity INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);