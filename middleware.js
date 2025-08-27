import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/saved-cars(.*)",
  "/reservations(.*)",
]);
//anything that comes after /admin will be protected route even admin is protected
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  // characteristics: ["userId"], // Track based on Clerk userId
  rules: [
    // Shield protection for content and security
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      allow: 
        ["CATEGORY:SEARCH_ENGINE"], // Google, Bing, etc
        // See the full list at https://arcjet.com/bot-list
      
    }),
  ],
});

//to check if user is logged in or not
const clerk= clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();  //we are accessing 2 variables i.e., userId and redirectToSignIn from auth()

  // If it's a protected route and the user is not signed in  --> protected route means no access without sign in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url }); // ⬅ Redirect to Clerk sign-in with redirect
  }

  // Allow request to continue
  return NextResponse.next(); // 
});

// we are creating Middleware by using clerk and Arcjet both ⭐⭐
export default createMiddleware(aj,clerk);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
