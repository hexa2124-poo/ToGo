import { NextRequest, NextResponse } from 'next/server'

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_API_URL || ''

/**
 * Proxies requests from the frontend to the Google Apps Script web app.
 * Apps Script only natively handles GET/POST, so PUT/DELETE/auth are
 * passed through as query params (_method, _auth) that Code.gs reads.
 */
async function proxy(req: NextRequest, method: string) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: 'Backend not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path') || ''
  const authHeader = req.headers.get('authorization') || ''

  const body = method !== 'GET' ? await req.text() : undefined

  const url = new URL(APPS_SCRIPT_URL)
  url.searchParams.set('path', path)
  url.searchParams.set('_method', method)
  if (authHeader) url.searchParams.set('_auth', authHeader)

  const res = await fetch(url.toString(), {
    method: method === 'GET' ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    redirect: 'follow',
  })

  const data = await res.json().catch(() => ({}))

  if (data?.error) {
    return NextResponse.json(data, { status: data.error === 'Not found' ? 404 : 400 })
  }

  return NextResponse.json(data)
}

export async function GET(req: NextRequest)    { return proxy(req, 'GET') }
export async function POST(req: NextRequest)   { return proxy(req, 'POST') }
export async function PUT(req: NextRequest)    { return proxy(req, 'PUT') }
export async function DELETE(req: NextRequest) { return proxy(req, 'DELETE') }
