/*
  Warnings:

  - The values [P,PC,PR,ADOCE,ADOCDA,ADOCD,DOCD,PREPES,AESL,AESAG,PA,PF] on the enum `PartnerStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `commentType` on the `partner_comments` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PartnerStatus_new" AS ENUM ('EmProspeccao', 'PrimeiroContatoFeito', 'PrimeiraReuniaoMarcadaRealizada', 'DocumentacaoEnviadaEmAnalise_Parceiro', 'DocumentacaoDevolvida_EmAnaliseAcademy', 'DocumentacaoDevolvida_EmAnaliseLegal', 'DocumentacaoAnalisadaDevolvida_Parceiro', 'EmPreparacaoDeExecutiveSummary_Academy', 'ESEmAnalise_Legal', 'ESEmAnaliseAcademy_Global', 'ProntoParaAssinatura', 'ParceriaFirmada');
ALTER TABLE "partners" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "partners" ALTER COLUMN "status" TYPE "PartnerStatus_new" USING ("status"::text::"PartnerStatus_new");
ALTER TYPE "PartnerStatus" RENAME TO "PartnerStatus_old";
ALTER TYPE "PartnerStatus_new" RENAME TO "PartnerStatus";
DROP TYPE "PartnerStatus_old";
ALTER TABLE "partners" ALTER COLUMN "status" SET DEFAULT 'EmProspeccao';
COMMIT;

-- AlterTable
ALTER TABLE "partner_comments" DROP COLUMN "commentType";

-- AlterTable
ALTER TABLE "partners" ALTER COLUMN "status" SET DEFAULT 'EmProspeccao';

-- DropEnum
DROP TYPE "partnerCommentsType";
