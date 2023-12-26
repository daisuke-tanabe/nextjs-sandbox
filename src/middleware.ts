import {NextRequest, NextResponse} from "next/server";

export default function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  console.log(request.headers.get('x-forwarded-for'));

  return res;
}