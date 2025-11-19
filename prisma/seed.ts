import 'dotenv/config';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';

  // Check if admin user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    console.log('👤 Admin user already exists');
    return;
  }

  // Hash password
  const hashedPassword = await hash(adminPassword, 10);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrator',
    },
  });

  console.log('✅ Admin user created successfully');
  console.log('📧 Email:', admin.email);
  console.log('🔑 Password:', adminPassword);

  // Create sample products
  const sampleProducts = [
    {
      name: 'Laptop Dell XPS 15',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD',
      category: 'Electronics',
      stock: 15,
    },
    {
      name: 'Wireless Mouse Logitech',
      description: 'Ergonomic wireless mouse with precision tracking',
      category: 'Accessories',
      stock: 50,
    },
    {
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with HDMI and USB 3.0',
      category: 'Accessories',
      stock: 30,
    },
  ];

  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Sample products created successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
