DROP DATABASE IF EXISTS icontrol_db;

CREATE DATABASE IF NOT EXISTS icontrol_db;

USE icontrol_db;

DROP TABLE IF EXISTS tblUsers;

CREATE TABLE IF NOT EXISTS tblUsers(
  userId INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE,  
  password VARCHAR(100)
);


CREATE TABLE inventory(
    id int NOT NULL AUTO_INCREMENT,
    userId integer(10) NOT NULL,
    invName varchar(25) NOT NULL,
    invDesc varchar(50) NOT NULL,
    invGroup varchar(30) NOT NULL,
    invWSP decimal(6,2) NOT NULL,
    invRTP decimal(6,2) NOT NULL,
    invStock integer(10) NOT NULL,
    invMRP integer(10) NOT NULL,
    PRIMARY KEY (id)
);