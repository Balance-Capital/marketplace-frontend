import axios, { AxiosResponse } from 'axios';
import rollbar from '../../services/rollbar'

/**
 * Sends a POST request to a backend API endpoint for user registration.
 * @param req - The request object containing information about the HTTP request.
 * @param res - The response object used to send the HTTP response.
 * @returns A Promise that resolves to the HTTP response from the backend API.
 */
const sendToBackend = async (req: any, res: any): Promise<AxiosResponse> => {
  const url = `${process.env.API_HOST}/auth/login/email/register`;
  const headers = req.headers;
  try {
    let response = null;
    try {
      response = await axios.post(url, {
        username: req.body.username,
        password: req.body.password
      }, {
        headers: {
          cookie: headers.cookie,
          'content-type': 'application/x-www-form-urlencoded'
        }
      });  
    } catch (err) {console.log(err?.response?.data)
      return res.status(err?.response?.status || 500).json({
        status: err?.response?.status || 500,
        message: err?.response?.data.msg
      });  
    }

    if (response === null) {
      throw new Error('Enquiry response null')
    }

    if (response.status >= 200 && response.status < 400) {
      return res.status(200).json({
        status: 200,
        message: "Registered, please login."
      });
    } else {
      const errors = response.data ? response.data : [];
      return res.status(response.status).json({
        status: response.status,
        message: errors.join(',')
      });
    }
  } catch (err) {
    rollbar.warning(`[enquiry ] AUTH ${err?.message}`, err);
    return res.status(500).json({
      status: 500,
      message: "Error submitting the enquiry form to server"
    });
  }
};


/**
 * Handles a POST request by verifying a Google reCAPTCHA token and sending data to the backend.
 * @param req - The request object containing the request details.
 * @param res - The response object used to send the response back to the client.
 */
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: 405,
      message: "Error submitting the enquiry form, wrong method, should be POST",
    });
  }

  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(process.env.GOOGLE_RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(req.body.gReCaptchaToken)}`;
    const reCaptchaRes = await axios.get(url);

    if (!reCaptchaRes.data.success) {
      return res.status(403).json({
        status: 403,
        message: reCaptchaRes.data['error-codes'] && reCaptchaRes.data['error-codes'][0] || 'other error',
      });
    }

    if (reCaptchaRes.data.score > 0.5) {
      // Save data to the database from here
      return sendToBackend(req, res);
    } else {
      return res.status(403).json({
        status: 403,
        message: "Google ReCaptcha low score",
      });
    }
  } catch (err) {
    rollbar.warning(`[enquiry ] AUTH ${err?.message}`, err);
    return res.status(400).json({
      status: 400,
      message: "Error submitting the enquiry form",
    });
  }
};
  
export default handler;