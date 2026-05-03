import { v2 as cloudinary } from 'cloudinary'

const hasCloudinaryConfig = Boolean(
  process.env.CLOUDINARY_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_SECRET_KEY
)

const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`

export const uploadMedia = async ({ req, file, resourceType }) => {
  try {
    if (hasCloudinaryConfig) {
      return await cloudinary.uploader.upload(file.path, { resource_type: resourceType })
    }
  } catch (error) {
    console.log('Cloudinary upload failed, using local storage:', error.message)
  }

  return {
    secure_url: `${getBaseUrl(req)}/uploads/${file.filename}`,
    duration: resourceType === 'video' ? 0 : undefined,
  }
}
