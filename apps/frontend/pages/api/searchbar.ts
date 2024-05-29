import backendApi from "../../utils/backendApi"
import { COOKIE_NAME } from '../../constants/cookieName'

export interface ISearchSchema {
  name: string,
  logo: string,
  domain: string,
  priority: string,
  description: string,
}

export default async function handler(req, res) {
  const userId = req?.cookies[COOKIE_NAME] || null;
  const referral = req?.cookies?.referral || null;
  const userTrackerId = `${userId}:${referral}`;

  const country = req?.cookies?.countryCode || 'US'
  const id = req?.query?.id
  const PAGE = `search/${id}`
  const QUERY = `sessionId=${userTrackerId}&country=${country}`

  const data = (await backendApi(PAGE, QUERY))?.data
  return res.status(200).json(data)
}
