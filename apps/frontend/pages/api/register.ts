import RollbarService from "../../services/rollbar"

/**
 * Handles a request and response by sending a POST request to an API endpoint with the provided data.
 * Returns the response as JSON. If there is an error, it logs a warning using the RollbarService.
 * @param req - The request object containing information about the incoming request.
 * @param res - The response object used to send the response back to the client.
 */
export default async function handler(req, res) {
  try {
    const API_HOST = process.env.API_HOST || null
    if (!API_HOST) {
      return res.status(500).json({ 'error': 'empty API HOST' })
    }

    const PAGE = `/auth/login/email/register`
    const DATA = {
      username: req.body.username,
      password: req.body.password
    }
    const headers = {
      ...req.headers,
      'Content-Type': 'application/json'
    }

    const response = await fetch(`${API_HOST}${PAGE}`, {
      method: 'POST',
      cache: 'no-cache',
      headers,
      body: JSON.stringify(DATA)
    })

    if (!response.ok) {
      throw new Error('Request failed')
    }

    const jsonResponse = await response.json()
    return res.status(200).json(jsonResponse)
  } catch (err) {
    RollbarService.warning(`[registerAPI] ${err?.message}`, err, req)
    return res.status(500).json({ 'error': 'Internal Server Error' })
  }
}
