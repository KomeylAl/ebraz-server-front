import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = params;

  const { name, phone, birth_date, role, password } = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${id}/edit`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`
        },
        body: JSON.stringify({
          name,
          phone,
          birth_date,
          role,
          password,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error editing admin" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(data);

    return NextResponse.json(
      // { message: "Admin edited successfuly" },
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
