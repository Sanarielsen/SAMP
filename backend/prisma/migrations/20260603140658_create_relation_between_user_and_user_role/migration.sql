-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roleId" TEXT NOT NULL DEFAULT 'e133af4f-dfa8-4e97-9393-6d9ad237b755';

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
