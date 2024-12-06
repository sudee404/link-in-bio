import { API_BASE_URL } from "@/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return axios
    .post(`${API_BASE_URL}/accounts/register/`, body)
    .then((res) => {
      return NextResponse.json(res.data, { status: 201 });
    })
    .catch((err) => {
      return NextResponse.json(err.response.data, {
        status: err.response.status,
      });
    });
}
