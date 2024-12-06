import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/AuthOptions';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const response = await getBios(session?.accessToken);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
    }
}

function getBios(token:any){
    return axios.get(`${API_BASE_URL}/bios/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data = await request.formData();
        const response = await postBio(data,session?.accessToken);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
    }
}
function postBio(data:any,token:any){
    return axios.post(`${API_BASE_URL}/bios/`,data,{
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}