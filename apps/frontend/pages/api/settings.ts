import { setCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import RollbarService from '../../services/rollbar'
import S3, { IS3Params }  from '../../utils/spaceDigitalOcean'

/**
 * Handles a request to update a user's profile.
 * @param req The request object containing the data sent by the client.
 * @param res The response object used to send the response back to the client.
 * @returns A Promise that resolves to the response from the API endpoint.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const IMAGE_PATH = 'assets/images/avatars/'
  const API_HOST = process.env.API_HOST || null

  if (!API_HOST) {
    return res.status(500).json({ 'error': 'empty API HOST' })
  }

  try {
    const BodyData = req.body
    let pathAndName = null

    if (BodyData.file) {
      const image = Buffer.from(BodyData.file, 'binary')
      const userAvatarId = new Date().getTime() * 1000
      const extFile = BodyData?.avatar?.split('.')
      const fileName = `${userAvatarId}.${extFile[extFile.length - 1]}`
      pathAndName = `${IMAGE_PATH}${fileName}`

      const params: IS3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: pathAndName,
        Body: image,
        ACL: "public-read",
        CacheControl: 'public,max-age=864000'
      }

      await S3.uploadObject(params)
    }

    const PAGE = `/settings`

    const data = {
      lastName: BodyData?.lastName || undefined,
      firstName: BodyData?.firstName || undefined,
      avatar: pathAndName || undefined,
      email: BodyData?.email || undefined
    }

    const response = await fetch(`${API_HOST}${PAGE}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${req.headers?.authorization}`
      },
      body: JSON.stringify(data)
    })

    if(!response) throw new Error('[Settings] Api - response from server null')

    const cookiesData = response?.headers?.get('set-cookie') || null

    if (cookiesData) {
      const cookies = cookiesData?.match(/token=([^;]+)/) || null
      if (cookies) {
        const token = cookies[0]?.replace('token=', '')
        if (token) setCookie('token', token, { req, res })
      }
    }

    const responseData = await response.json()
    return res.status(200).json(responseData)
  } catch (err) {
    RollbarService.warning(`[Settings], catch all update profile ${err?.message}`, req, err)
    return res.status(500).json({ err })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
    maxDuration: 5,
  },
}
