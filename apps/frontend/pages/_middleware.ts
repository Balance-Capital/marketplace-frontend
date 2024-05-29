// import { useRollbar } from '@rollbar/react'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 } from 'uuid'
import { COOKIE_NAME } from '../constants/cookieName'

export async function middleware(request: NextRequest) {
  // const logger = useRollbar()
  try {
    const API_HOST = process.env.API_HOST
    const date = new Date()
    const dateCopyOneYear = new Date(date.getTime())
    dateCopyOneYear.setFullYear(date.getFullYear() + 1)
    const expiresOneYear = dateCopyOneYear
    
    const response = NextResponse.next()
    let userTrackerId = request.cookies[COOKIE_NAME] || null;
    const referral = request.url.match(/referral=(.*)/gui) || null;
    if(referral && referral.length > 0) {
      const ref = referral[0].replace(/referral=/gui,'')
      response.cookie('referral', ref, {
        expires: expiresOneYear
      })
    }
  
    if(!userTrackerId) {
      userTrackerId = v4()
      response.cookie(COOKIE_NAME, userTrackerId, {
        expires: expiresOneYear
      })
    }

    return response  
  } catch(err) {
    // logger.warning(`Middleware issue with message ${err?.message}`, request, err)
    console.warn(`Middleware issue with message ${err?.message}, ${err?.stack}`)
  }
}
