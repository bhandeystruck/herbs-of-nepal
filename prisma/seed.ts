import "dotenv/config";
import {
  EvidenceLevel,
  HerbSourceSection,
  PrismaClient,
  SourceType,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Seed script database client.
 * Uses the pooled runtime DATABASE_URL.
 */
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting seed...");

  /**
   * Clear join/dependent records first.
   */
  await prisma.herbSource.deleteMany();
  await prisma.source.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.herb.deleteMany();
  await prisma.category.deleteMany();

  /**
   * Categories
   */
  const immunityCategory = await prisma.category.create({
    data: {
      name: "Immunity",
      slug: "immunity",
      description: "Herbs traditionally associated with resilience and immune wellness.",
    },
  });

  const digestiveCategory = await prisma.category.create({
    data: {
      name: "Digestive Health",
      slug: "digestive-health",
      description: "Herbs commonly used in traditional digestion and gut comfort practices.",
    },
  });

  const respiratoryCategory = await prisma.category.create({
    data: {
      name: "Respiratory Support",
      slug: "respiratory-support",
      description: "Herbs traditionally used for cough, cold, and respiratory comfort.",
    },
  });

  /**
   * Herbs with trust metadata
   */
  const tulsi = await prisma.herb.create({
    data: {
      slug: "tulsi",
      name: "Tulsi",
      nepaliName: "तुलसी",
      scientificName: "Ocimum tenuiflorum",
      shortDescription:
        "A sacred herb widely used in Nepal for immunity and respiratory support.",
      description:
        "Tulsi is one of the most respected medicinal herbs in South Asia. In Nepal, it is commonly grown in homes and used in teas, home remedies, and traditional wellness practices.",
      benefits: [
        "May support immunity",
        "Commonly used for cough and cold relief",
        "Traditionally valued for stress support",
      ],
      uses: ["Herbal tea", "Home remedies", "Traditional daily wellness use"],
      precautions: [
        "Should not replace medical treatment",
        "Consult a professional before medicinal use during pregnancy",
      ],
      sideEffects:
        "May not be suitable for everyone. People with specific health conditions should seek professional guidance.",
      dosageNotes:
        "Dosage depends on preparation type and individual needs. Consult a qualified practitioner for medicinal use.",
      region: "Across Nepal",
      imagePath: "herbs/tulsi/primary.jpg",
      imageAlt: "Tulsi plant used in Nepalese herbal traditions",
      imageSourceName: "Verified botanical image source",
      imageSourceUrl: null,
      imageLicense: "Usage verified by project owner",
      imagePhotographer: null,
      imageVerifiedAt: new Date("2026-04-15"),
      featured: true,
      isPublished: true,
      seoTitle: "Tulsi Benefits, Uses, and Safety | Herbs of Nepal",
      seoDescription:
        "Learn about Tulsi, its traditional uses in Nepal, potential benefits, precautions, and safety considerations.",
      evidenceLevel: EvidenceLevel.LIMITED_EVIDENCE,
      lastReviewedAt: new Date("2026-04-14"),
      reviewedByName: "Herbs of Nepal Editorial Team",
      reviewedByRole: "Editorial Review",
      editorialSummary:
        "This page combines traditional use context with general educational safety guidance and should not be interpreted as clinical treatment advice.",
      categoryId: respiratoryCategory.id,
    },
  });

  const timur = await prisma.herb.create({
    data: {
      slug: "timur",
      name: "Timur",
      nepaliName: "टिमुर",
      scientificName: "Zanthoxylum armatum",
      shortDescription:
        "A Himalayan spice-herb known for its unique taste and traditional medicinal uses.",
      description:
        "Timur is used in Nepali cuisine and traditional practices. It is well known for its tingling flavor and has long been associated with digestive and oral wellness traditions.",
      benefits: [
        "Traditionally used for digestion",
        "Commonly associated with oral care support",
        "Used in Himalayan herbal practices",
      ],
      uses: ["Spice blends", "Traditional remedies", "Infusions and local preparations"],
      precautions: [
        "Use moderately",
        "Consult a professional before therapeutic use",
      ],
      sideEffects:
        "Overuse may cause irritation or discomfort depending on individual sensitivity.",
      dosageNotes:
        "Use moderately in food or traditional preparations unless advised otherwise by a qualified expert.",
      region: "Hilly and Himalayan regions",
      imagePath: "herbs/timur/primary.jpg",
      imageAlt: "Timur plant from Himalayan herbal tradition",
      imageSourceName: "Verified botanical image source",
      imageSourceUrl: null,
      imageLicense: "Usage verified by project owner",
      imagePhotographer: null,
      imageVerifiedAt: new Date("2026-04-15"),
      featured: true,
      isPublished: true,
      seoTitle: "Timur Benefits, Uses, and Safety | Herbs of Nepal",
      seoDescription:
        "Explore Timur, a traditional Himalayan herb-spice used in Nepal for digestion, oral care, and local remedies.",
      evidenceLevel: EvidenceLevel.TRADITIONAL_USE,
      lastReviewedAt: new Date("2026-04-14"),
      reviewedByName: "Herbs of Nepal Editorial Team",
      reviewedByRole: "Editorial Review",
      editorialSummary:
        "This page primarily reflects traditional and cultural use context and should not be treated as proof of clinical effectiveness.",
      categoryId: digestiveCategory.id,
    },
  });

  const ginger = await prisma.herb.create({
    data: {
      slug: "ginger",
      name: "Ginger",
      nepaliName: "अदुवा",
      scientificName: "Zingiber officinale",
      shortDescription:
        "A warming herb commonly used in Nepal for digestion and everyday wellness.",
      description:
        "Ginger is widely used in Nepali households in teas, food, and traditional preparations. It is especially valued during cold weather and for digestive comfort.",
      benefits: [
        "Traditionally associated with digestive support",
        "Commonly used in warming herbal preparations",
        "Often included in seasonal home remedies",
      ],
      uses: ["Tea", "Cooking", "Traditional home remedies"],
      precautions: [
        "Use carefully if medically advised to avoid certain herbs",
        "Consult a professional before therapeutic use",
      ],
      sideEffects:
        "Some individuals may experience irritation or sensitivity depending on amount and tolerance.",
      dosageNotes:
        "Use should depend on form, concentration, and personal tolerance.",
      region: "Across Nepal",
      imagePath: "herbs/ginger/primary.jpg",
      imageAlt: "Ginger plant used in Nepalese household and herbal practice",
      imageSourceName: "Verified botanical image source",
      imageSourceUrl: null,
      imageLicense: "Usage verified by project owner",
      imagePhotographer: null,
      imageVerifiedAt: new Date("2026-04-15"),
      featured: false,
      isPublished: true,
      seoTitle: "Ginger Benefits, Uses, and Safety | Herbs of Nepal",
      seoDescription:
        "Discover Ginger, its traditional uses in Nepal, digestive benefits, preparation methods, and precautions.",
      evidenceLevel: EvidenceLevel.MODERATE_EVIDENCE,
      lastReviewedAt: new Date("2026-04-14"),
      reviewedByName: "Herbs of Nepal Editorial Team",
      reviewedByRole: "Editorial Review",
      editorialSummary:
        "This page includes both widespread traditional use and broader general educational information, with safety and context still important.",
      categoryId: digestiveCategory.id,
    },
  });

  /**
   * Sources
   */
  const nccihHerbs = await prisma.source.create({
    data: {
      title: "Herbs at a Glance",
      organization: "National Center for Complementary and Integrative Health",
      publisher: "NCCIH",
      sourceType: SourceType.GOVERNMENT_FACT_SHEET,
      url: "https://www.nccih.nih.gov/health/herbsataglance",
      citation:
        "National Center for Complementary and Integrative Health. Herbs at a Glance.",
      notes:
        "Used as a general government health information reference point for herbs and public-facing educational framing.",
    },
  });

  const herbDrugInteractions = await prisma.source.create({
    data: {
      title: "Herb-Drug Interactions",
      organization: "National Center for Complementary and Integrative Health",
      publisher: "NCCIH",
      sourceType: SourceType.GOVERNMENT_FACT_SHEET,
      url: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions",
      citation:
        "National Center for Complementary and Integrative Health. Herb-Drug Interactions.",
      notes:
        "Used to support safety and interaction-aware educational language.",
    },
  });

  const medlinePlus = await prisma.source.create({
    data: {
      title: "MedlinePlus",
      organization: "U.S. National Library of Medicine",
      publisher: "NIH / NLM",
      sourceType: SourceType.GOVERNMENT_FACT_SHEET,
      url: "https://medlineplus.gov/",
      citation:
        "U.S. National Library of Medicine. MedlinePlus.",
      notes:
        "Used as a high-trust consumer health reference source.",
    },
  });

  const tulsiReview = await prisma.source.create({
    data: {
      title: "General review literature on Ocimum tenuiflorum (Tulsi / Holy Basil)",
      authors: "Representative review reference placeholder",
      year: 2020,
      sourceType: SourceType.PEER_REVIEWED_REVIEW,
      citation:
        "Representative peer-reviewed review source on Ocimum tenuiflorum educational context.",
      notes:
        "Placeholder peer-reviewed review record to structure later real citation workflows.",
    },
  });

  const gingerReview = await prisma.source.create({
    data: {
      title: "General review literature on Zingiber officinale (Ginger)",
      authors: "Representative review reference placeholder",
      year: 2021,
      sourceType: SourceType.PEER_REVIEWED_REVIEW,
      citation:
        "Representative peer-reviewed review source on Zingiber officinale educational context.",
      notes:
        "Placeholder peer-reviewed review record to structure later real citation workflows.",
    },
  });

  const ethnobotanicalReference = await prisma.source.create({
    data: {
      title: "Ethnobotanical reference for Himalayan and Nepalese traditional plant use",
      sourceType: SourceType.ETHNOBOTANICAL_REFERENCE,
      citation:
        "Representative ethnobotanical reference placeholder for Nepalese and Himalayan herbal context.",
      notes:
        "Used to model traditional use references pending final curation of specific Nepal-focused sources.",
    },
  });

  /**
   * Herb-source links
   */
  await prisma.herbSource.createMany({
    data: [
      {
        herbId: tulsi.id,
        sourceId: ethnobotanicalReference.id,
        section: HerbSourceSection.TRADITIONAL_USE,
        displayOrder: 1,
        note: "Supports traditional and household use context.",
      },
      {
        herbId: tulsi.id,
        sourceId: tulsiReview.id,
        section: HerbSourceSection.SCIENCE,
        displayOrder: 2,
        note: "Supports general modern research framing.",
      },
      {
        herbId: tulsi.id,
        sourceId: herbDrugInteractions.id,
        section: HerbSourceSection.SAFETY,
        displayOrder: 3,
        note: "Supports interaction-aware safety language.",
      },

      {
        herbId: timur.id,
        sourceId: ethnobotanicalReference.id,
        section: HerbSourceSection.TRADITIONAL_USE,
        displayOrder: 1,
        note: "Supports traditional Himalayan culinary and household use context.",
      },
      {
        herbId: timur.id,
        sourceId: nccihHerbs.id,
        section: HerbSourceSection.GENERAL,
        displayOrder: 2,
        note: "Supports high-level educational herb framing.",
      },

      {
        herbId: ginger.id,
        sourceId: gingerReview.id,
        section: HerbSourceSection.SCIENCE,
        displayOrder: 1,
        note: "Supports broader educational science framing.",
      },
      {
        herbId: ginger.id,
        sourceId: medlinePlus.id,
        section: HerbSourceSection.GENERAL,
        displayOrder: 2,
        note: "Supports general public health reference framing.",
      },
      {
        herbId: ginger.id,
        sourceId: herbDrugInteractions.id,
        section: HerbSourceSection.SAFETY,
        displayOrder: 3,
        note: "Supports safety and interactions language.",
      },
    ],
  });

  /**
   * Blog posts
   */
  await prisma.blogPost.createMany({
    data: [
      {
        title: "Why Nepalese Herbs Matter in Traditional Wellness",
        slug: "why-nepalese-herbs-matter-in-traditional-wellness",
        excerpt:
          "An introduction to why herbs hold an important place in Nepalese households, traditions, and everyday wellness practices.",
        content:
          "Nepalese herbal knowledge is deeply connected to local tradition, geography, and everyday life. Across villages, towns, and cities, herbs have long been used in food, rituals, home preparations, and seasonal wellness practices. Understanding these herbs means understanding a living cultural tradition shaped by mountains, biodiversity, and generations of shared knowledge.",
        featuredImagePath: null,
        featuredImageAlt: null,
        imageSourceName: null,
        imageSourceUrl: null,
        imageLicense: null,
        imagePhotographer: null,
        isPublished: true,
        seoTitle: "Why Nepalese Herbs Matter | Herbs of Nepal",
        seoDescription:
          "Explore why Nepalese herbs remain important in traditional wellness, cultural knowledge, and daily life.",
      },
      {
        title: "Understanding Tulsi in Nepalese Households",
        slug: "understanding-tulsi-in-nepalese-households",
        excerpt:
          "Tulsi is more than a herb. It carries cultural, spiritual, and everyday wellness significance across Nepalese homes.",
        content:
          "Tulsi is among the most recognizable herbs in Nepalese life. It is often grown at home, used in warm drinks, and valued for its place in both traditional wellness and cultural practice. Its presence reflects how herbs can hold both practical and symbolic importance at the same time.",
        featuredImagePath: null,
        featuredImageAlt: null,
        imageSourceName: null,
        imageSourceUrl: null,
        imageLicense: null,
        imagePhotographer: null,
        isPublished: true,
        seoTitle: "Understanding Tulsi in Nepalese Households | Herbs of Nepal",
        seoDescription:
          "Learn why Tulsi is culturally and traditionally significant in Nepalese households.",
      },
      {
        title: "Timur: The Himalayan Spice with Traditional Value",
        slug: "timur-the-himalayan-spice-with-traditional-value",
        excerpt:
          "Timur is known for its distinctive flavor and long-standing place in local food and traditional herbal practices.",
        content:
          "Timur stands out for its tingling, citrus-like character and its long association with local preparation methods in Himalayan regions. It appears both as a culinary ingredient and as part of traditional household knowledge, making it an important herb-spice in the Nepalese context.",
        featuredImagePath: null,
        featuredImageAlt: null,
        imageSourceName: null,
        imageSourceUrl: null,
        imageLicense: null,
        imagePhotographer: null,
        isPublished: true,
        seoTitle: "Timur Traditional Uses and Value | Herbs of Nepal",
        seoDescription:
          "Discover Timur, a Himalayan spice-herb valued in Nepalese food and traditional practices.",
      },
    ],
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });