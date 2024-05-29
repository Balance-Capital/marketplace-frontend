import RollbarService from "../../services/rollbar"

export default async function handler(req, res) {
  try {
    const PAGE = `withdraw`
    const API_HOST = process.env.API_HOST || null
    const result = await fetch(`${API_HOST}/${PAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${req.headers.authorization}`
      }
    })
      .then((response) => response)
      .catch(err => {return {status: 500}})
  
    return res.status(result?.status || 0).json(result);  
  } catch (err) {
    RollbarService.warning(`issue withdraw ${err?.message}`, err, req);
  }
}
