-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/WDhnlp
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "hospitals" (
    "hospital_code" CHAR(1)   NOT NULL,
    "location_need_defined" VARCHAR   NOT NULL,
    "capacity_do_we_need" INTEGER   NOT NULL,
    CONSTRAINT "pk_hospitals" PRIMARY KEY (
        "hospital_code"
     )
);

CREATE TABLE "daily_summary_QUESTION" (
    "hospital_code" CHAR(1)   NOT NULL,
    "date" DATE   NOT NULL,
    "no_admitted_patients" INTEGER   NOT NULL,
    "board_time_12" INTEGER   NOT NULL,
    "board_time_12_24" INTEGER   NOT NULL,
    "board_time_24_48" INTEGER   NOT NULL,
    "board_time_48" INTEGER   NOT NULL,
    CONSTRAINT "pk_daily_summary_QUESTION" PRIMARY KEY (
        "hospital_code","date"
     )
);

CREATE TABLE "admit_details" (
    "patient_record"  SERIAL  NOT NULL,
    "hospital_code" CHAR(1)   NOT NULL,
    "date" DATE   NOT NULL,
    "decision-to_discharge" INTEGER   NOT NULL,
    CONSTRAINT "pk_admit_details" PRIMARY KEY (
        "patient_record"
     )
);

ALTER TABLE "daily_summary_QUESTION" ADD CONSTRAINT "fk_daily_summary_QUESTION_hospital_code" FOREIGN KEY("hospital_code")
REFERENCES "hospitals" ("hospital_code");

ALTER TABLE "admit_details" ADD CONSTRAINT "fk_admit_details_hospital_code" FOREIGN KEY("hospital_code")
REFERENCES "hospitals" ("hospital_code");

