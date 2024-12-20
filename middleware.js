import { NextResponse } from "next/server";

// Config is for all routes that could be artifact from og v1
export const config = {
  matcher: "/(.*?).png(.*?)",
};

export default async function middleware(req) {
  const pattern = new RegExp("/(.*?).png(.*?)");
  const path = req.nextUrl.pathname;

  // if the path matches the pattern, we redirect the request to the new route
  if (pattern.test(path)) {
    // We remove everything after .png
    const imageText = path.split(".png")[0];

    return NextResponse.redirect(new URL(`/api/og/${imageText}`, req.url));
  }
}
