CREATE TABLE "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "email" VARCHAR(64) NOT NULL UNIQUE,
    "password" VARCHAR(64) NOT NULL
);

CREATE TABLE "doctors" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "numberPwz" VARCHAR(7) NOT NULL UNIQUE,
    "firstname" VARCHAR(64) NOT NULL,
    "lastname" VARCHAR(64) NOT NULL,
    "specialization" VARCHAR(64) NOT NULL
);

CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "doctorId" INTEGER NOT NULL,
    "dayOfWeek" SMALLINT NOT NULL,
    "hourOpen" TIME NOT NULL,
    "hourClose" TIME NOT NULL,
    FOREIGN KEY ("doctorId") REFERENCES doctors("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "pantients" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "firstname" VARCHAR(64) NOT NULL,
    "lastname" VARCHAR(64) NOT NULL,
    "postcode" VARCHAR(6) NOT NULL,
    "street" VARCHAR(64) NOT NULL,
    "city" VARCHAR(64) NOT NULL,
    "phone" VARCHAR(9) NOT NULL,
    "pesel" VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE "visits" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "doctorId" INTEGER NOT NULL,
    "pantientId" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "description" TEXT NULL,
    FOREIGN KEY ("pantientId") REFERENCES pantients("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("doctorId") REFERENCES doctors("id") ON DELETE CASCADE ON UPDATE CASCADE
);