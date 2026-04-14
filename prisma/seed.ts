import "dotenv/config";
import { PrismaClient } from "@prisma/client";
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

  await prisma.blogPost.deleteMany();
  await prisma.herb.deleteMany();
  await prisma.category.deleteMany();

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

  await prisma.herb.createMany({
    data: [
      {
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
        image: "/images/herbs/tulsi.jpg",
        featured: true,
        isPublished: true,
        seoTitle: "Tulsi Benefits, Uses, and Safety | Herbs of Nepal",
        seoDescription:
          "Learn about Tulsi, its traditional uses in Nepal, potential benefits, precautions, and safety considerations.",
        categoryId: respiratoryCategory.id,
      },
      {
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
        image: "/images/herbs/timur.jpg",
        featured: true,
        isPublished: true,
        seoTitle: "Timur Benefits, Uses, and Safety | Herbs of Nepal",
        seoDescription:
          "Explore Timur, a traditional Himalayan herb-spice used in Nepal for digestion, oral care, and local remedies.",
        categoryId: digestiveCategory.id,
      },
      {
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
        image: "/images/herbs/ginger.jpg",
        featured: false,
        isPublished: true,
        seoTitle: "Ginger Benefits, Uses, and Safety | Herbs of Nepal",
        seoDescription:
          "Discover Ginger, its traditional uses in Nepal, digestive benefits, preparation methods, and precautions.",
        categoryId: digestiveCategory.id,
      },
    ],
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: "Why Nepalese Herbs Matter in Traditional Wellness",
        slug: "why-nepalese-herbs-matter-in-traditional-wellness",
        excerpt:
          "An introduction to why herbs hold an important place in Nepalese households, traditions, and everyday wellness practices.",
        content:
          "Nepalese herbal knowledge is deeply connected to local tradition, geography, and everyday life. Across villages, towns, and cities, herbs have long been used in food, rituals, home preparations, and seasonal wellness practices. Understanding these herbs means understanding a living cultural tradition shaped by mountains, biodiversity, and generations of shared knowledge.",
        featuredImageUrl: null,
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
        featuredImageUrl: null,
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
        featuredImageUrl: null,
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