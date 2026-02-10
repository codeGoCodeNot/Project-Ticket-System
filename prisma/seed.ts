import { hash } from "@node-rs/argon2";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { email } from "zod";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const users = [
  {
    username: "johnsen30",
    email: "johnsenberdin30@gmail.com",
    emailVerified: true,
  },
  {
    username: "user2",
    email: "johnsenberdin2930@gmail.com",
    emailVerified: true,
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399, // $4.99,
  },

  {
    title: "Ticket 2",
    content: "This is the second ticket from the database.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 299, // $2.99
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 199, // $1.99
  },
];

const comments = [
  {
    content: "This is the first comment from db.",
  },
  {
    content: "This is the second comment from db.",
  },
  {
    content: "This is the third comment from db.",
  },
];

const seed = async () => {
  await prisma.comment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.membership.deleteMany();

  const dbOrganization = await prisma.organization.create({
    data: {
      name: "Organization 1",
    },
  });

  const passwordHash = await hash("berdin123");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });

  await prisma.membership.createMany({
    data: [
      {
        userId: dbUsers[0].id,
        organizationId: dbOrganization.id,
        isActive: true,
        membershipRole: "ADMIN",
      },
      {
        userId: dbUsers[1].id,
        organizationId: dbOrganization.id,
        isActive: true,
        membershipRole: "MEMBER",
      },
    ],
  });

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({ ...ticket, userId: dbUsers[0].id })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: dbUsers[1].id,
      ticketId: dbTickets[0].id,
    })),
  });
};

seed();
