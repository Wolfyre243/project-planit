-- CreateTable
CREATE TABLE "user" (
    "user_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "todoList" (
    "todo_list_id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todoList_pkey" PRIMARY KEY ("todo_list_id")
);

-- CreateTable
CREATE TABLE "todo" (
    "todo_id" UUID NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "todo_list_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("todo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "idx_todo_list_user_id" ON "todoList"("user_id");

-- CreateIndex
CREATE INDEX "idx_todo_todo_list_id" ON "todo"("todo_list_id");

-- AddForeignKey
ALTER TABLE "todoList" ADD CONSTRAINT "todoList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_todo_list_id_fkey" FOREIGN KEY ("todo_list_id") REFERENCES "todoList"("todo_list_id") ON DELETE CASCADE ON UPDATE CASCADE;
