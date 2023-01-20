-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/WDhnlp
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "hospitals" (
    "hospital_code" CHAR(1)   NOT NULL,
    "latitude" DECIMAL   NOT NULL,
    "longitude" DECIMAL   NOT NULL,
    CONSTRAINT "pk_hospitals" PRIMARY KEY (
        "hospital_code"
     )
);

CREATE TABLE "admit_details" (
    "record_"  SERIAL  NOT NULL,
    "hospital_code" CHAR(1)   NOT NULL,
    "date" DATE   NOT NULL,
    "disposition" VARCHAR   NOT NULL,
    "decision_to_discharge_time" INTEGER   NOT NULL,
    CONSTRAINT "pk_admit_details" PRIMARY KEY (
        "record_"
     )
);

ALTER TABLE "admit_details" ADD CONSTRAINT "fk_admit_details_hospital_code" FOREIGN KEY("hospital_code")
REFERENCES "hospitals" ("hospital_code");

