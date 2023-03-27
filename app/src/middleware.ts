import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClientApiSchema } from "./schemas/client";
import { createContactApiSchema } from "./schemas/contact";

export default async function middleware(request: NextRequest) {
  try {
    const { method, headers } = request;

    const url = request.url;
    const authToken = request.cookies.get("_clientToken");

    if (url.includes("/dashboard")) {
      if (!authToken) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    }

    switch (true) {
      case url.includes("/signin"):
        if (authToken) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      case url.includes("/signup"):
        if (authToken) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    const token = headers.get("authorization")?.split(" ")[1];

    switch (true) {
      case request.nextUrl.pathname.startsWith("/api/users/"):
        if (token) {
          return NextResponse.next();
        }
        return NextResponse.json(
          { message: "A token is required." },
          { status: 401 }
        );

      case request.nextUrl.pathname.startsWith("/api/contacts"):
        if (token) {
          return NextResponse.next();
        }
        return NextResponse.json(
          { message: "A token is required." },
          { status: 401 }
        );

      case request.nextUrl.pathname.startsWith("/api/contacts/"):
        if (token) {
          return NextResponse.next();
        }
        return NextResponse.json(
          { message: "A token is required." },
          { status: 401 }
        );

      case method !== "POST" && method !== "PATCH":
        return NextResponse.next();

      case request.nextUrl.pathname.startsWith("/api/users"):
        createClientApiSchema.parse(await request.json());
        return NextResponse.next();

      case request.nextUrl.pathname.startsWith("/api/users/"):
        createClientApiSchema.partial().parse(await request.json());
        return NextResponse.next();

      case request.nextUrl.pathname.startsWith("/api/contacts"):
        createContactApiSchema.parse(await request.json());

      case request.nextUrl.pathname.startsWith("/api/contacts/"):
        createContactApiSchema.partial().parse(await request.json());
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
