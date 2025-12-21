import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database.",
    status: "DONE" as const,
    deadline: "2025-12-19",
    bounty: 399, // $4.99,
  },

  {
    title: "Ticket 2",
    content: "This is the second ticket from the database.",
    status: "OPEN" as const,
    deadline: "2025-12-19",
    bounty: 299, // $2.99
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database.",
    status: "IN_PROGRESS" as const,
    deadline: "2025-12-19",
    bounty: 199, // $1.99
  },
];

const seed = async () => {
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });
};

seed();
