import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function authenticate(req) {
  // Get the token from the request cookie
  const Atoken = req.cookies.get("Admintoken")?.value;
  const Itoken = req.cookies.get("Inspectortoken")?.value;
  const Utoken = req.cookies.get("Usertoken")?.value; 
  const Asecret= process.env.NEXT_PUBLIC_SECRET_ADMIN;
  const Isecret = process.env.NEXT_PUBLIC_SECRET_INSP;

  const Usecret = process.env.NEXT_PUBLIC_SECRET_USER;


  // Verify the token
  const verifiedTokenA =
    Atoken &&
    (await verifyToken(Atoken, Asecret).catch((err) => console.error(err)));
  const verifiedTokenI =
    Itoken &&
    (await verifyToken(Itoken, Isecret).catch((err) => console.error(err)));
  const verifiedTokenU =
    Itoken &&
    (await verifyToken(Utoken, Usecret).catch((err) => console.error(err)));


  // Check if the user is trying to access an admin page without a valid token
  const isAdminPage = /^\/admin/i.test(req.nextUrl.pathname);
  const isInspectorPage = /^\/inspector/i.test(req.nextUrl.pathname);
  const isUserPage = /^\/user/i.test(req.nextUrl.pathname);

  if (isAdminPage && !verifiedTokenA) {
    // Redirect the user to the login page with a message
    const redirectUrl = `https://lrub.netlify.app?message=${encodeURIComponent(
      "Access to this page is restricted. Please log in to continue."
    )}`;
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminPage && !verifiedTokenA) {
    // Redirect the user to the login page with a message
    const redirectUrl = `https://lrub.netlify.app?message=${encodeURIComponent(
      "Access to this page is restricted. Please log in to continue."
    )}`;
    return NextResponse.redirect(redirectUrl);
  }
  if (isInspectorPage && !verifiedTokenI) {
    // Redirect the user to the login page with a message
    const redirectUrl = `https://lrub.netlify.app?message=${encodeURIComponent(
      "Access to this page is restricted. Please log in to continue."
    )}`;
    return NextResponse.redirect(redirectUrl);
  }
  if (isUserPage && !verifiedTokenU) {
    // Redirect the user to the login page with a message
    const redirectUrl = `https://lrub.netlify.app?message=${encodeURIComponent(
      "Access to this page is restricted. Please log in to continue."
    )}`;
    return NextResponse.redirect(redirectUrl);
  }
  // Allow the request to proceed if the user is authenticated or the page is not an admin page
  return NextResponse.next();
}


const verifyToken = async (token,secret) => {
  try {
    const verfied = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return verfied.payload;
  } catch (error) {
    throw new Error("your token has expired");
  }
};
