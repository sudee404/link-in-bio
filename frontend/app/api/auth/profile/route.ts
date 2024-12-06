import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const user = await registerUser(body);
        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
    }
}

function registerUser(data:any){
    return axios.post(`${API_BASE_URL}/accounts/register`, data)
}