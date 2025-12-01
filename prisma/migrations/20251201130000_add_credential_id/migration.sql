-- AlterTable
ALTER TABLE "passkeys" ADD COLUMN "credentialID" TEXT NOT NULL DEFAULT '';
ALTER TABLE "passkeys" ADD COLUMN "aaguid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "passkeys_credentialID_key" ON "passkeys"("credentialID");

-- Remove default after column is added
ALTER TABLE "passkeys" ALTER COLUMN "credentialID" DROP DEFAULT;
