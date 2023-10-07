import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'GET Hello World' }, { status: 200 });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'POST Hello World' }, { status: 200 });
}
