-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,

    PRIMARY KEY ("id")
);
