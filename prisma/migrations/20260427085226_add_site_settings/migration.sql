-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteTagline" TEXT,
    "siteUrl" TEXT,
    "defaultSeoTitle" TEXT,
    "defaultSeoDescription" TEXT,
    "logoPath" TEXT,
    "faviconPath" TEXT,
    "defaultReviewerName" TEXT,
    "defaultReviewerRole" TEXT,
    "editorialDisclaimer" TEXT,
    "safetyDisclaimer" TEXT,
    "requireHerbSourceBeforePublish" BOOLEAN NOT NULL DEFAULT false,
    "requireHerbImageBeforePublish" BOOLEAN NOT NULL DEFAULT false,
    "requireHerbReviewBeforePublish" BOOLEAN NOT NULL DEFAULT false,
    "requireBlogImageBeforePublish" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
