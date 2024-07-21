-- SQLBook: Code
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    password VARCHAR(255) NOT NULL,
    pseudo VARCHAR(80) NOT NULL,
    image_profile VARCHAR(255) DEFAULT 'https://cdn.pixabay.com/photo/2017/11/06/18/30/eggplant-2924511_1280.png',
    email VARCHAR(80) NOT NULL UNIQUE,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255) DEFAULT '/images/Logo_foodtastics.png',
    calories INT,
    proteins INT,
    carbohydrates INT,
    sugar INT,
    lipids INT,
    salt INT,
    fiber INT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE RESTRICT
);

CREATE TABLE badge (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE label (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE menu (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE recipe (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    number_of_people INT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    date DATETIME DEFAULT NOW(),
    is_favorite BOOLEAN DEFAULT false,
    vote INT UNSIGNED DEFAULT 0,
    set_up_time INT UNSIGNED NOT NULL,
    is_validated BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    badge_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE RESTRICT,
    FOREIGN KEY (badge_id) REFERENCES badge (id)
);

CREATE TABLE comment (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    date DATETIME DEFAULT NOW(),
    description TEXT NOT NULL,
    is_validated BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE RESTRICT,
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
);

CREATE TABLE user_menu_recipe (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    menu_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE RESTRICT,
    FOREIGN KEY (menu_id) REFERENCES menu (id) ON DELETE CASCADE
);

CREATE TABLE badge_user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    badge_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (badge_id) REFERENCES badge (id),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE recipe_label (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    label_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (label_id) REFERENCES label (id),
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE
);

CREATE TABLE recipe_ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)
);