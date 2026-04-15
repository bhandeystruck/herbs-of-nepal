-- CreateEnum
CREATE TYPE "EvidenceLevel" AS ENUM ('TRADITIONAL_USE', 'LIMITED_EVIDENCE', 'EMERGING_EVIDENCE', 'MODERATE_EVIDENCE', 'STRONG_EVIDENCE', 'SAFETY_DATA_LIMITED');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('GOVERNMENT_FACT_SHEET', 'PEER_REVIEWED_REVIEW', 'SYSTEMATIC_REVIEW', 'META_ANALYSIS', 'CLINICAL_TRIAL', 'JOURNAL_ARTICLE', 'UNIVERSITY_ARTICLE', 'ETHNOBOTANICAL_REFERENCE', 'BOOK', 'INSTITUTIONAL_PDF', 'ORGANIZATION_PAGE', 'OTHER');

-- CreateEnum
CREATE TYPE "HerbSourceSection" AS ENUM ('GENERAL', 'OVERVIEW', 'TRADITIONAL_USE', 'SCIENCE', 'SAFETY', 'PREPARATION', 'INTERACTIONS');

-- AlterTable
ALTER TABLE "herbs" ADD COLUMN     "editorialSummary" TEXT,
ADD COLUMN     "evidenceLevel" "EvidenceLevel",
ADD COLUMN     "lastReviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedByName" TEXT,
ADD COLUMN     "reviewedByRole" TEXT;

-- CreateTable
CREATE TABLE "sources" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT,
    "organization" TEXT,
    "publisher" TEXT,
    "year" INTEGER,
    "sourceType" "SourceType" NOT NULL,
    "url" TEXT,
    "pdfUrl" TEXT,
    "citation" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "herb_sources" (
    "id" TEXT NOT NULL,
    "herbId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "section" "HerbSourceSection" NOT NULL DEFAULT 'GENERAL',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "note" TEXT,

    CONSTRAINT "herb_sources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sources_sourceType_idx" ON "sources"("sourceType");

-- CreateIndex
CREATE INDEX "sources_organization_idx" ON "sources"("organization");

-- CreateIndex
CREATE INDEX "sources_year_idx" ON "sources"("year");

-- CreateIndex
CREATE INDEX "herb_sources_herbId_idx" ON "herb_sources"("herbId");

-- CreateIndex
CREATE INDEX "herb_sources_sourceId_idx" ON "herb_sources"("sourceId");

-- CreateIndex
CREATE INDEX "herb_sources_section_idx" ON "herb_sources"("section");

-- CreateIndex
CREATE UNIQUE INDEX "herb_sources_herbId_sourceId_section_key" ON "herb_sources"("herbId", "sourceId", "section");

-- CreateIndex
CREATE INDEX "herbs_evidenceLevel_idx" ON "herbs"("evidenceLevel");

-- AddForeignKey
ALTER TABLE "herb_sources" ADD CONSTRAINT "herb_sources_herbId_fkey" FOREIGN KEY ("herbId") REFERENCES "herbs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "herb_sources" ADD CONSTRAINT "herb_sources_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "sources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
