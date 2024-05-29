import RollbarService from "../../services/rollbar"

export default async function handler(req, res) {
  const walletAddress = req?.query?.walletAddress || null;
  const walletName = req?.query?.walletName

  const PAGE = `wallets`
  const API_HOST = process.env.API_HOST || null
  const result = await fetch(`${API_HOST}/${PAGE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${req.headers.authorization}`
    },
    body: JSON.stringify({
      walletAddress,
      walletName
    })})
    .then((response) => response)
    .catch(err => {RollbarService.warning(err, req); return {status: 500}})

    return res.status(result?.status || 0).json(result)
}
