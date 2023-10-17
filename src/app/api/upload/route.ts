

import { NextRequest, NextResponse } from 'next/server';
import dbjson from '@/app/api/db.json'

export async function GET (request: NextRequest) {

  return NextResponse.json(dbjson)
}

