
export const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/sewasetu";

export const SECRET_KEY: string =
  process.env.SECRET_KEY || "sweasetu_secret_key";

export const JWT_EXPIRES_IN: string =
  process.env.JWT_EXPIRES_IN || "7d";