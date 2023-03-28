import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleWare(req) {
  const token = req.cookies.get("token")?.value;
  console.log(token);

  const verifiedToken =
    token && (await verifyToken(token).catch((er) => console.log(er)));

  if (req.nextUrl.pathname.startsWith("/Admin") && !verifiedToken) {
    return NextResponse.rewrite(new URL(req.url, "https://lrub.netlify.app/"));
  }
  if (verifiedToken) {
    return NextResponse.rewrite(
      new URL(req.url, "http://localhost:3000/Admin")
    );
  }
  if (!verifiedToken) {
    console.log(req.url);
    return;
  }
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

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   if (request.nextUrl.pathname.startsWith("/Admin")) {
//     if (true) {
//       // return NextResponse.rewrite(new URL("/Admin", request.url));
//     }
//     if (false) {
//       return NextResponse.rewrite(new URL("/Admin", request.url));
//     }
//   }

//   if (request.nextUrl.pathname.startsWith("/User")) {
//     return NextResponse.rewrite(new URL("/Admin", request.url));
//   }
// }
