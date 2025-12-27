-- Add the userId column as optional
ALTER TABLE "Ticket" ADD COLUMN "userId" TEXT;

-- Assign default values to userId (optional step)
UPDATE "Ticket" SET "userId" = null WHERE "userId" IS NULL;

-- Set userId to NOT NULL (once default values are assigned)
ALTER TABLE "Ticket" ALTER COLUMN "userId" SET NOT NULL;

-- Create index for userId
CREATE INDEX "Ticket_userId_idx" ON "Ticket"("userId");