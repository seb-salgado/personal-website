import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { caseStudies } from "@/lib/case-studies-data";

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const list = caseStudies.map(
    ({ slug, title, client, year, description, coverImage, available }) => ({
      slug,
      title,
      client,
      year,
      description,
      coverImage,
      available,
    })
  );

  return NextResponse.json(list);
}
