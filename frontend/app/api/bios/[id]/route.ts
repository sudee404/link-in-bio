import { API_BASE_URL } from "@/config";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/AuthOptions";

export async function GET(request: Request, {params}:{params: any}) {
  const session = await getServerSession(authOptions);
  const { id } =  await params;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const response = await getBio(session?.accessToken, id);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    );
  }
}

function getBio(token: any, id: any) {
  return axios.get(`${API_BASE_URL}/bios/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function PATCH(request: Request, {params}:{params: any}) {
  const session = await getServerSession(authOptions);
  const { id } =  await params;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await request.formData();
    const response = await updateBio(data, session?.accessToken, id);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    );
  }
}
function updateBio(data: any, token: any, id:any) {
  return axios.patch(`${API_BASE_URL}/bios/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
export async function DELETE(request: Request, {params}:{params: any}) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const response = await deleteBio(session?.accessToken,id);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 400 }
    );
  }
}
function deleteBio( token: any,id:any) {
  return axios.delete(`${API_BASE_URL}/bios/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
