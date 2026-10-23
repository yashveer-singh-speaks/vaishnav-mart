import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email, password, isFirebaseAuthenticated } = await request.json()

    const validEmails = [
      (process.env.DEV_ADMIN_EMAIL || '').toLowerCase(),
      'raskanfood@gmail.com',
      'owner@vaishnavamart.local',
    ].filter(Boolean)

    const expectedPassword = process.env.DEV_ADMIN_PASSWORD || 'vaishnav123'

    // If verified directly via Firebase Auth Client
    if (isFirebaseAuthenticated && validEmails.includes((email || '').toLowerCase())) {
      cookies().set('vm_admin_session', 'authenticated_owner', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return NextResponse.json({
        success: true,
        message: 'Firebase Superadmin authenticated',
        user: { email, role: 'super_admin' },
      })
    }

    // Direct password match (Fallback & Dev Admin)
    if (validEmails.includes((email || '').toLowerCase()) && password === expectedPassword) {
      cookies().set('vm_admin_session', 'authenticated_owner', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return NextResponse.json({
        success: true,
        message: 'Owner authenticated successfully',
        user: { email, role: 'super_admin' },
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials. Please verify your email and password.' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Authentication error' }, { status: 500 })
  }
}

export async function GET() {
  const adminCookie = cookies().get('vm_admin_session')
  const isAuthenticated = adminCookie?.value === 'authenticated_owner'
  return NextResponse.json({ isAuthenticated })
}

export async function DELETE() {
  cookies().delete('vm_admin_session')
  return NextResponse.json({ success: true, message: 'Logged out' })
}
