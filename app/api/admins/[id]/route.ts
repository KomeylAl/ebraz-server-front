import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${id}`,
      {
        method: "GET",
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${token?.value}`
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error geting admin" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      data,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { messaage: `Something went wrong, ${error}` },
      { status: 500 }
    );
  }
}
