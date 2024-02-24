const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // ジャンルデータの作成
  await prisma.genre.createMany({
    data: [
      { name: "sample1" },
      { name: "sample2" },
    ],
  });
  // タスクデータの作成
  await prisma.task.createMany({
    data: [
      { name: "task1", explanation: "test1", deadlineDate: new Date("2024-01-01"), status: 0, genreId: 1 },
      { name: "task2", explanation: "test2", deadlineDate: new Date("2024-01-02"), status: 0, genreId: 2 },
    ],
  });
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })