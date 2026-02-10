-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "membershipRole" "MembershipRole" NOT NULL DEFAULT 'MEMBER';
