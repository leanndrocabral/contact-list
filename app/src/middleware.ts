import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { client } from "./schemas/client.schema";
import { contact } from "./schemas/contacts.schema";

export default async function middleware(request: NextRequest) {
  try {
    const { method, headers } = request;
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
        client.parse(await request.json());
        return NextResponse.next();

      case request.nextUrl.pathname.startsWith("/api/users/"):
        client.partial().parse(await request.json());
        return NextResponse.next();

      case request.nextUrl.pathname.startsWith("/api/contacts"):
        contact.parse(await request.json());

      case request.nextUrl.pathname.startsWith("/api/contacts/"):
        contact.partial().parse(await request.json());
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
