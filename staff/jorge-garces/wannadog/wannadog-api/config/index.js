require('dotenv').config()

const {
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY,
    CLOUDINARY_NAME,
    MONGO_URL,
    MONGO_URL_TEST,
    NODE_ENV,
    PORT = 8080
} = process.env
module.exports = {
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY,
    CLOUDINARY_NAME,
    MONGO_URL,
    MONGO_URL_TEST,
    ENV: NODE_ENV,
    PORT
}