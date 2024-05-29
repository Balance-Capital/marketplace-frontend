import Rollbar from "rollbar"

const options = {
  accessToken: process.env.ROLLBAR_TOKEN_SERVER,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.ENV,
  payload: {
    code_version: '1.0.0',
  }
}

const RollbarService = new Rollbar(options)

export default RollbarService;