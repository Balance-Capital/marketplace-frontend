import { IDataWithProducts } from '../interfaces/withProducts'
import getCookiesFromRequest from './getCookiesFromRequest'
import RollbarService from '../services/rollbar'
import { COOKIE_NAME } from '../constants/cookieName'

export interface IBackendApi {
  data: IDataWithProducts;
  status: number;
  trackerId: string;
}

const backendApi = async (page: string, query: string): Promise<IBackendApi> => {
  try {
    const API_HOST = process.env.API_HOST || null
    if(!API_HOST) return {
      data: null,
      status: 0,
      trackerId: null
    }

    const url = `${API_HOST}/${page}/?${query}`;
    const response = await fetch(url)

    const cookieStore = getCookiesFromRequest(response);

    if (response.status >= 200 && response.status < 300) {
      const json = await response.json()
      return {
        data: typeof json === 'object' ? json : [...json],
        status: response.status,
        trackerId: cookieStore[COOKIE_NAME] || null
      }
    } else {
      return {
        data: null,
        status: response.status,
        trackerId: cookieStore[COOKIE_NAME] || null
      }
    }

  } catch(err) {
    RollbarService.warning(`Backend API connector with message: ${err?.message}, ${err?.stack}`,err)
  }
}

export default backendApi
