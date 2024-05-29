import RollbarService from '../services/rollbar'

export interface IReturnHeaders {
    'Authorization': string;
    'Content-Type': string;
}

const getAuthorization = (headers: any) => {
    const isVercel = headers["x-vercel-sc-headers"]
        ? true
        : false
    const Authorization = isVercel 
        ? typeof headers["x-vercel-sc-headers"] === 'string'
            ? JSON.parse(headers["x-vercel-sc-headers"]).Authorization
            : headers["x-vercel-sc-headers"].Authorization
        : headers["Authorization"] || headers["authorization"]
    return Authorization;
}

const vercelHeadersFix = (headers: any, context?: any): IReturnHeaders => {
    try {
        const result:IReturnHeaders = {
            'Authorization': `${getAuthorization(headers)}`,
            'Content-Type': 'application/json'
        }
        return result
    } catch (e) {
        RollbarService.warning(`${e?.message}, ${e?.stack}`, context)
    }
}

export default vercelHeadersFix