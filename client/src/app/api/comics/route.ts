import { NextRequest, NextResponse } from "next/server"
import mockData from "../(mocks)/comics.json"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams

  // Mock API, will add data later
  return NextResponse.json(mockData)
}