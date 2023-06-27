CREATE TABLE Employee (
    Eusername VARCHAR(255),
    name VARCHAR(255),
    LastName VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (Eusername)

);
CREATE TABLE Manager (
    Musername VARCHAR(255),
    name VARCHAR(255),
    LastName VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (Musername)
);

CREATE TABLE TASK (
    TaskID INT,
     Eusername VARCHAR(255) ,
    Taskname VARCHAR(255),
    StartTime DATETIME,
    EndTime DATETIME,
    Status VARCHAR(20),
    PRIMARY KEY (TaskID),
    FOREIGN KEY(Eusername) REFERENCES Employee(Eusername)

);

CREATE TABLE AVAILABILITY(
    StartT DATETIME,
    EndT DATETIME,
    Eusername VARCHAR(255),
    name VARCHAR(255),
    FOREIGN KEY(Eusername) REFERENCES Employee(Eusername)
);

CREATE TABLE GROUPTASK(
    
    
    GroupID INT NOT NULL,
    Description VARCHAR(255),
    Eusername VARCHAR(255),
    StartTIME DATETIME,
    EndTIME DATETIME,
    FOREIGN KEY (Eusername) REFERENCES Employee(Eusername)

);
GroupID,Description,Eusername,StartTIME,EndTIME