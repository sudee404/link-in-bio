import { authOptions } from './../[...nextauth]/AuthOptions';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const response = await getUser(session?.accessToken);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
    }
}

function getUser(token:any){
    return axios.get(`${API_BASE_URL}/accounts/profile/`,{
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
        const user = await request.json();
        const response = await updateUser(user,session?.accessToken);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
    }
}
function updateUser(user:any,token:any){
    return axios.post(`${API_BASE_URL}/accounts/profile/`,user,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}