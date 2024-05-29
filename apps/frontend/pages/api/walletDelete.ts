import RollbarService from "../../services/rollbar"

export default async function handler(req, res) {
  const walletAddress = req?.query?.wallet || null;
    
  const PAGE = `wallets`
  const API_HOST = process.env.API_HOST || null
  const uri = `${API_HOST}/${PAGE}/?walletAddress=${walletAddress}`;
  const result = await fetch(uri, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${req.headers.authorization}`
    }
  })
    .then(async (response) => response.json())
    .catch(err => RollbarService.error(err, req))
  return res.status(200).json(result)
}
