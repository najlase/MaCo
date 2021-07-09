CREATE TABLE PersonType (personTypeID int primary key, personType varchar(10));

INSERT INTO PersonType VALUES (1, "SMUmember");
INSERT INTO PersonType VALUES (2, "Manager");

CREATE TABLE Person (
  personID int, 
  personTypeID int references PersonType(PersonTypeID), 
  lastName varchar(255) NOT NULL, 
  firstName varchar(255), 
  email varchar(255), 
  password varchar(255),
  status boolean,
  PRIMARY KEY(personID), 
  UNIQUE (personID,personTypeID));
  
  
INSERT INTO Person VALUES (1000,1,"Benhmida","Sofia","sofia.benhmida@msb.tn","password1",1);
INSERT INTO Person VALUES (1001,1,"Ben Yedder","Helmi","helmi.benyedder@msb.tn","password2",1);
INSERT INTO Person VALUES (1002,1,"Ben Khlifa","karim", "karim.benkhlifa@medtech.tn","password3",1);
INSERT INTO Person VALUES (1003,2,"Ben Hamed","Ahmed", "ahmed.benhamed@gmail.com","password3",1);
  
CREATE TABLE smuType (smuTypeID int primary key AUTO_INCREMENT, smuType varchar(10));

INSERT INTO smuType VALUES (1, "Teacher");
INSERT INTO smuType VALUES (2, "Student");
  
CREATE TABLE SMUmember( 
  personID int primary key AUTO_INCREMENT, 
  personTypeID int not null default 1 check (personTypeID = 1), 
  foreign key (personID, personTypeID) references Person(personID, personTypeID),
  smuTypeID int REFERENCES smuType(smuTypeID),
  UNIQUE (personID,smuTypeID)
);


INSERT INTO SMUmember VALUES (1000,1,1);
INSERT INTO SMUmember VALUES (1001,1,2);
INSERT INTO SMUmember VALUES (1002,1,2);




CREATE TABLE Manager( 
  personID int primary key AUTO_INCREMENT, 
  personTypeID int not null default 2 check (PersonTypeID = 2), 
  foreign key (personID, personTypeID) references Person(personID, personTypeID)
);

INSERT INTO Manager VALUES (1003,2);


CREATE TABLE Teacher( 
  personID int primary key AUTO_INCREMENT, 
  smuTypeID int not null default 1 check (smuTypeID = 1), 
  foreign key (personID, smuTypeID) references SMUmember(personID, smuTypeID)
);

INSERT INTO Teacher VALUES (1000,1);


CREATE TABLE Student( 
  personID int primary key AUTO_INCREMENT, 
  smuTypeID int not null default 2 check (smuTypeID = 2), 
  foreign key (personID, smuTypeID) references SMUmember(personID, smuTypeID)
);

INSERT INTO Student VALUES (1001,2);
INSERT INTO Student VALUES (1002,2);

CREATE TABLE Convention (cID int NOT NULL AUTO_INCREMENT, description TEXT(500),startDate DATE,EndDate DATE, PRIMARY KEY(cID));

INSERT INTO Convention VALUES (100,"Convention with teachers & california gym -50% yoga", '2021-01-12', '2021-03-15');
INSERT INTO Convention VALUES (101,"Convention with students & eatme -20% sandwich", '2021-04-12', '2021-06-14');

UPDATE `Convention` SET `startDate` = '2021-01-04', `EndDate` = '2021-03-16' WHERE `Convention`.`cID` = 100;
UPDATE `Convention` SET `startDate` = '2021-03-03', `EndDate` = '2021-05-11' WHERE `Convention`.`cID` = 101;


CREATE TABLE ReductionType (reductionTypeID int primary key AUTO_INCREMENT, reductionType varchar(50));
    
INSERT INTO ReductionType VALUES (1, "TeacherReduction");
INSERT INTO ReductionType VALUES (2, "StudentReduction");


CREATE TABLE Reduction(cID int NOT NULL AUTO_INCREMENT,  reduction int, PRIMARY KEY(cID), foreign key(cID) REFERENCES Convention(cID),  reductionTypeID int REFERENCES reductionType(reductionTypeID),
  UNIQUE (cID,reductionTypeID));

INSERT INTO `Reduction` (`cID`, `reduction`, `reductionTypeID`) VALUES ('100', '50', '1'), ('101', '20', '2');

CREATE TABLE TeacherReduction( 
  cID int primary key AUTO_INCREMENT, 
  reductionTypeID int not null default 1 check (reductionTypeID = 1), 
  foreign key (cID, reductionTypeID) references Reduction(cID, reductionTypeID)
);

INSERT INTO `TeacherReduction` (`cID`, `reductionTypeID`) VALUES ('100', '1');

CREATE TABLE StudentReduction( 
  cID int primary key AUTO_INCREMENT, 
  reductionTypeID int not null default 2 check (reductionTypeID = 2), 
  foreign key (cID, reductionTypeID) references Reduction(cID, reductionTypeID)
);

INSERT INTO `StudentReduction` (`cID`, `reductionTypeID`) VALUES ('101', '2');

CREATE TABLE TeacherClaim( cId int, personID int, validated boolean, foreign key (cID) references TeacherReduction(cID), foreign key (personID) references Teacher(personID));

INSERT INTO `TeacherClaim` (`cId`, `personID`, `validated`) VALUES ('100', '1000', b'0');

CREATE TABLE StudentClaim( cId int, personID int, validated boolean, foreign key (cID) references StudentReduction(cID), foreign key (personID) references Student(personID));

INSERT INTO `StudentClaim` (`cId`, `personID`, `validated`) VALUES ('101', '1001', b'0'), ('101', '1002', b'1');


CREATE TABLE Partners(companyID int AUTO_INCREMENT, name varchar(20), logo TEXT, PRIMARY KEY(companyID));

INSERT INTO `Partners` (`companyID`, `name`, `logo`) VALUES ('3001', 'calgym', 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_200/https://www.n9ayedweldi.tn/wp-content/uploads/2020/01/california.png'), ('3002', 'eatme', 'data:image/jpeg;base64,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');


CREATE TABLE Category(categoryID int AUTO_INCREMENT, name varchar(20), PRIMARY KEY(categoryID));

INSERT INTO `Category` (`categoryID`, `name`) VALUES ('2001', 'sport'), ('2002', 'food');


CREATE TABLE WorksFor(PersonID int, companyid int, foreign key (personID) references Manager(personID), FOREIGN Key (companyid) references Partners (companyid));

INSERT INTO `WorksFor` (`PersonID`, `companyid`) VALUES ('1003', '3001'), ('1003', '3002');

CREATE TABLE Rating(PersonID int, companyid int, score int, foreign key (personID) references SMUmember(personID), FOREIGN Key (companyid) references Partners (companyid));

INSERT INTO `Rating` (`PersonID`, `companyid`, `score`) VALUES ('1000', '3001', '3'), ('1001', '3002', '2');

CREATE TABLE RelatedTo(cID int, companyid int, foreign key (cID) references Convention(cID), FOREIGN Key (companyid) references Partners (companyid));

INSERT INTO `RelatedTo` (`cID`, `companyid`) VALUES ('100', '3001'), ('101', '3002');

CREATE TABLE has(CategoryID int, companyid int, foreign key (categoryID) references Category(categoryID), FOREIGN Key (companyid) references Partners (companyid));

INSERT INTO `has` (`CategoryID`, `companyid`) VALUES ('2001', '3001'), ('2002', '3002');
