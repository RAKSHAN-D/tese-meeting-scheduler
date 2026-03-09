const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const year = 2026;
  const monthIndex = 2; // March
  const startDay = 1;
  const endDay = 31;

  const workStartMinutes = 9 * 60; // 09:00
  const workEndMinutes = 18 * 60; // 18:00
  const slotIntervalMinutes = 15;
  const slotDurationMinutes = 15;

  const rows = [];

  for (let day = startDay; day <= endDay; day += 1) {
    const weekday = new Date(Date.UTC(year, monthIndex, day)).getUTCDay();
    if (weekday === 0 || weekday === 6) continue; // Skip weekends

    for (
      let startMinutes = workStartMinutes;
      startMinutes <= workEndMinutes - slotDurationMinutes;
      startMinutes += slotIntervalMinutes
    ) {
      const hour = Math.floor(startMinutes / 60);
      const minute = startMinutes % 60;

      const startAt = new Date(Date.UTC(year, monthIndex, day, hour, minute, 0));
      const endAt = new Date(startAt.getTime() + slotDurationMinutes * 60 * 1000);
      const slotDate = new Date(Date.UTC(year, monthIndex, day, 0, 0, 0));

      rows.push({ slotDate, startAt, endAt });
    }
  }

  const result = await prisma.timeSlot.createMany({
    data: rows,
    skipDuplicates: true,
  });

  const total = await prisma.timeSlot.count();
  console.log(`Seed complete. Inserted ${result.count} slots (duplicates skipped).`);
  console.log(`Total rows in time_slots: ${total}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

