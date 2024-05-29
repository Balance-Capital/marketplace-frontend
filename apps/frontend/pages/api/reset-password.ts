import RollbarService from "../../services/rollbar"
export default async function handler(req, res) {
  const API_HOST = process.env.API_HOST || null
  if(!API_HOST) return res.status(500).json({'error':'empty API HOST'})

  const {resetPasswordToken, password, sign} = req?.query || null;
  if(!resetPasswordToken) return res.status(500).json({'error':'empty resetPasswordToken'})
    
  const PAGE = `/auth/reset-password`;
  const DATA = `?resetPasswordToken=${resetPasswordToken}&password=${password}&sign=${sign}`;

  fetch(`${API_HOST}${PAGE}${DATA}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (response) => {
      if(response?.status >= 200 && response?.status < 300) {
        const data = await response?.json();
        return res.status(200).json(data)
      }
      res.status(response?.status || 500).json();       
    })
    .catch((err) => {
      RollbarService.warning(`Reset password catch with ${err?.message}`, req, err)
      res.status(500).json({error: [err?.message]})
    })
}
