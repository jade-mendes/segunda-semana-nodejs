import { env } from "@/env/index.js";
import { prisma } from "@/libs/prisma.js";
import { hash } from "bcryptjs";

export async function seed() {
  await prisma.user.upsert({
    where: {
      email: "admin@email.com",
    },
    update: {},
    create: {
      publicId: "00000000-0000-0000-0000-000000000001",
      name: "Administrador",
      email: "admin@email.com",
      passwordHash: await hash("senha", env.HASH_SALT_ROUNDS),
      role: "ADMIN",
    },
  });

  console.log("Database seeded successfully.");
}

seed()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    prisma.$disconnect();
    process.exit(1);
  });
