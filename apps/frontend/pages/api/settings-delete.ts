import { getCookie, setCookie } from 'cookies-next'
import RollbarService from '../../services/rollbar'
import S3, { IS3DeleteParams, IS3Params }  from '../../utils/spaceDigitalOcean'

export default async function handler(req, res) {
  const IMAGE_PATH = 'assets/images/avatars/'
  const API_HOST = process.env.API_HOST || null
  if(!API_HOST) return res.status(500).json({'error':'empty API HOST'})
  
  try {
    const fileName = req?.query?.file || null;
    if (!fileName) return res.status(400).json({result: 'no file'});

    const pathAndName = `${IMAGE_PATH}${fileName}`
  
    const params:IS3DeleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: pathAndName
    }

    await S3.deleteObject(params);

    const PAGE = `/settings`

    return await fetch(`${API_HOST}${PAGE}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${req.headers.authorization}`
      },
      body: undefined,
    }).then((data) => {
      const cookiesData = data?.headers?.get('set-cookie')  || null;
      if(cookiesData) {
        const cookies = cookiesData?.match(/token=([^;]+)/);
        const token = cookies[0].replace('token=','')
        if(token) setCookie('token', token, {req, res});
      }
      return data.json();
    }).then((response) => {
      return res.status(200).json(response)
    })
  } catch (err) {
    RollbarService.warn(`Settings, delete avatar profile ${err?.message}, ${err?.stack}`, req)
    return res.status(500).json({err})
  }
}
