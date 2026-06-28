import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { caseStudies } from "@/lib/case-studies-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug && item.available);

  if (!study) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(study);
}
