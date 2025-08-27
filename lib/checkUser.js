//this is used to store user table in database(storing user in DB)
import { currentUser } from "@clerk/nextjs/server";

import { db } from "./prisma";


export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {  //if user has not signed in
    return null;
  }

  try {  //go to prisma documentation to learn about findUnique method in prisma and learn such many others
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,   
        name:`${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};
