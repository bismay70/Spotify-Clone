import { v2 as cloudinary } from 'cloudinary'

const hasCloudinaryConfig = Boolean(
  process.env.CLOUDINARY_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_SECRET_KEY
)

const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`

export const uploadMedia = async ({ req, file, resourceType }) => {
  if (hasCloudinaryConfig) {
    return cloudinary.uploader.upload(file.path, { resource_type: resourceType })
  }

  return {
    secure_url: `${getBaseUrl(req)}/uploads/${file.filename}`,
    duration: resourceType === 'video' ? 0 : undefined,
  }
}
