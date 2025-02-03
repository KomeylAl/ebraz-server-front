import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = params;

  try {
    const {
      doctor_id,
      supervisor_id,
      admin_id,
      record_number,
      reference_source,
      admission_date,
      visit_date,
      chief_complaints,
      present_illness,
      past_history,
      family_history,
      personal_history,
      mse,
      diagnosis,
      companion_name,
      companion_phone,
      companion_address,
      images
    } = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients/${id}/record/store`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({
          doctor_id,
          supervisor_id,
          admin_id,
          record_number,
          reference_source,
          admission_date,
          visit_date,
          chief_complaints,
          present_illness,
          past_history,
          family_history,
          personal_history,
          mse,
          diagnosis,
          companion_name,
          companion_phone,
          companion_address,
          images
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error storing record" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error storing record" },
      { status: 500 }
    );
  }
}
