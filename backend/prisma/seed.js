const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Global Health Network',
      plan: 'ENTERPRISE',
    },
  });

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      orgId: org.id,
      email: 'admin@resalloc.ai',
      name: 'Alex Johnson',
      passwordHash: 'hashed_password_here', // In real app, use bcrypt
      role: 'ADMIN',
      department: 'Administration',
    },
  });

  // Create Resources
  const resources = [
    { name: 'Dr. Sarah Wilson', type: 'HUMAN', status: 'AVAILABLE', department: 'Cardiology', costPerHour: 150 },
    { name: 'MRI Unit 1', type: 'MACHINE', status: 'OCCUPIED', department: 'Radiology', costPerHour: 300 },
    { name: 'Operating Room 3', type: 'ROOM', status: 'MAINTENANCE', department: 'Surgery', costPerHour: 500 },
    { name: 'Ambulance V-12', type: 'VEHICLE', status: 'OFFLINE', department: 'Emergency', costPerHour: 100 },
    { name: 'Dr. Michael Chen', type: 'HUMAN', status: 'AVAILABLE', department: 'Pediatrics', costPerHour: 140 },
    { name: 'Ventilator X-09', type: 'MACHINE', status: 'AVAILABLE', department: 'ICU', costPerHour: 50 },
  ];

  for (const res of resources) {
    await prisma.resource.create({
      data: {
        ...res,
        orgId: org.id,
      },
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
