-- DropTable
DROP TABLE IF EXISTS "passkeys";

-- CreateTable
CREATE TABLE "passkey" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "publicKey" TEXT NOT NULL,
    "credential_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "webauthn_user_id" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "device_type" TEXT NOT NULL,
    "backed_up" BOOLEAN NOT NULL,
    "transports" TEXT,
    "aaguid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passkey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passkey_credential_id_key" ON "passkey"("credential_id");

-- AddForeignKey
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
