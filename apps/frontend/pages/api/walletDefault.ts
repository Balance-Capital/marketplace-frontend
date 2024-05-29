import RollbarService from "../../services/rollbar"

export default async function handler(req, res) {
  const walletAddress = req?.query?.wallet || null;
    
  const PAGE = `wallet`
  const API_HOST = process.env.API_HOST || null
  const result = await fetch(`${API_HOST}/${PAGE}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${req.headers.authorization}`
    },
    body: JSON.stringify({
      walletAddress
    })})
    .then(async (response) => response.json())
    .catch(err => RollbarService.error(err, req))

    return res.status(200).json(result)
}
