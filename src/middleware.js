import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function authenticate(req) {
  // Get the token from the request cookie
  const token = req.cookies.get("token")?.value;

  // Verify the token
  const verifiedToken =
    token && (await verifyToken(token).catch((err) => console.error(err)));

  // Check if the user is trying to access an admin page without a valid token
  const isAdminPage = /^\/admin/i.test(req.nextUrl.pathname);
  const isUnauthenticated = !verifiedToken;
  if (isAdminPage && isUnauthenticated) {
    // Redirect the user to the login page with a message
    const redirectUrl = `https://lrub.netlify.app?message=${encodeURIComponent(
      "Access to this page is restricted. Please log in to continue."
    )}`;
    return NextResponse.redirect(redirectUrl);
  }

  // Allow the request to proceed if the user is authenticated or the page is not an admin page
  return NextResponse.next();
}

const getJWtSecert = () => {
  const sercret = process.env.NEXT_PUBLIC_SECRET_ADMIN;

  if (!sercret || sercret.length == 0) {
    throw new Error("The envirnoment variable is not set");
  }
  return sercret;
};

const verifyToken = async (token) => {
  try {
    console.log("asd");
    const verfied = await jwtVerify(
      token,
      new TextEncoder().encode(getJWtSecert())
    );
    console.log(verfied, verfied.payload);
    return verfied.payload;
  } catch (error) {
    throw new Error("your token has expired");
  }
};
