import { PutObjectCommand, S3Client, DeleteObjectCommand, DeleteObjectCommandInput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import RollbarService from '../services/rollbar'

const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: false,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
})

export interface IS3Params {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ACL: string;
  CacheControl: string;  
}

export interface IS3DeleteParams {
  Bucket: string;
  Key: string;
}

const uploadObject = async (params: IS3Params) => {
  try {
    const command = new PutObjectCommand(params as PutObjectCommandInput)
    const data = await s3Client.send(command)
    return data
  } catch (err) {
    RollbarService.warn(`S3 upload image issue, ${err?.message}, ${err?.stack}`,err)
  }
}

const deleteObject = async (params: IS3DeleteParams) => {
  try {
    const command = new DeleteObjectCommand(params as DeleteObjectCommandInput)
    const data = await s3Client.send(command)
    return data
  } catch (err) {
    RollbarService.warn(`S3 delete image issue, ${err?.message}, ${err?.stack}`,err)
  }
}

const S3 = {deleteObject, uploadObject}
export default S3