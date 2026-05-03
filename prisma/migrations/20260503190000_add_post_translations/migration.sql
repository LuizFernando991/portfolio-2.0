ALTER TABLE "post" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "post" ADD COLUMN "slugEn" TEXT;
ALTER TABLE "post" ADD COLUMN "contentEn" TEXT;
ALTER TABLE "post" ADD COLUMN "excerptEn" TEXT;

CREATE UNIQUE INDEX "post_slugEn_key" ON "post"("slugEn");
