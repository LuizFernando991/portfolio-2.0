import { prisma } from "../src/lib/prisma";
import { auth } from "../src/lib/auth";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin "${email}" already exists, skipping.`);
    process.exit(0);
  }

  console.log(`Creating admin user: ${email}`);

  await auth.api.signUpEmail({
    body: { email, password, name: "Admin" },
  });

  console.log("Admin user created successfully.");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Error:", err?.message || err);
  process.exit(1);
});
