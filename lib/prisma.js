//To communicate with database we have to create prisma instance that will make a call to database
//import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "./generated/prisma"

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {  //!== "production" means we are still in developmental mode
  globalThis.prisma = db;
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.

