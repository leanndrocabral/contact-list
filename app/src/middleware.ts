import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createClientApiSchema,
  updateClientApiSchema,
} from "./schemas/backend/client";
import {
  createContactApiSchema,
  updateContactApiSchema,
} from "./schemas/backend/contact";
import { ZodError } from "./interfaces/backend/interfaces";

export default async function middleware(request: NextRequest) {
  try {
    const url = request.nextUrl.pathname;
    const urls: string[] = ["/signin", "/signup"];

    const token = request.cookies.get("_clientToken");

    if (urls.includes(url) && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
      
    } else if (url.includes("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } catch {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }

  try {
    const url = request.nextUrl.pathname;
    
    if (url.includes("/api/clients") && request.method.includes("POST")) {
      const paylaod = await request.json();
      const validate: ZodError = createClientApiSchema.safeParse(paylaod);

      if (!validate.success) {
        return NextResponse.json({ message: validate }, { status: 400 });
      }
    } else if (
      url.includes("/api/clients/") &&
      request.method.includes("PATCH")
    ) {
      const paylaod = await request.json();
      const validate: ZodError = updateClientApiSchema.safeParse(paylaod);

      if (!validate.success) {
        return NextResponse.json({ message: validate }, { status: 400 });
      }
    }

    if (url.includes("/api/contacts") && request.method.includes("POST")) {
      const paylaod = await request.json();
      const validate: ZodError = createContactApiSchema.safeParse(paylaod);

      if (!validate.success) {
        return NextResponse.json({ message: validate }, { status: 400 });
      }
    } else if (
      url.includes("/api/contacts/") &&
      request.method.includes("PATCH")
    ) {
      const paylaod = await request.json();
      const validate: ZodError = updateContactApiSchema.safeParse(paylaod);

      if (!validate.success) {
        return NextResponse.json({ message: validate }, { status: 400 });
      }
    }
  } catch (error){
    console.log(error);
    
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }

  try {
    const id = request.nextUrl.pathname.split("/").at(-1);

    const url = request.nextUrl.pathname;
    const urls: string[] = [
      "/api/clients",
      "/api/contacts",
      `/api/clients/${id}`,
      `/api/contacts/${id}`,
    ];

    const token = request.headers.get("authorization") as string;
    const authToken = token?.split(" ")[1];

    if (urls[0].includes(url) && request.method.includes("POST")) {
      return NextResponse.next();

    } else if (urls.includes(url) && authToken) {
      return NextResponse.next();

    } else if (urls.includes(url) && !authToken) {
      return NextResponse.json(
        { message: "A token is required." },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
