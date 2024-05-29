import RollbarService from "../../services/rollbar";

export default async function handler(req, res) {
  try {
    const API_HOST = process.env.API_HOST || null
    if(!API_HOST) return res.status(500).json({'error':'empty API HOST'})
  
    const {email} = req?.query || null;
    if(!email) return res.status(409).json({'error':'empty e-mail address'})
      
    const PAGE = `/auth/forgot-password`;
    const DATA = `?email=${email}`;
  
    return fetch(`${API_HOST}${PAGE}${DATA}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        if(response.status >=200 && response.status <300) {
          const data = await response.json();
          return res.status(200).json(data)
        }
        return res.status(response.status).json('email sent');       
      })
      .catch((err) => {
        RollbarService.error(err, req)
        return res.status(500).json({err})
      })  
  } catch (err) {
    RollbarService.error(err, req)
    return res.status(500).json({err})
  }
}
