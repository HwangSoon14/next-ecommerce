/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "https://next-ecommerce-kappa-two.vercel.app/",
    "MONGO_URL": "mongodb+srv://hson:hson@cluster0.vamke.mongodb.net/next_app?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET": "'!wPzP[9'9Cv')C4rPJu+]&+/<%QMV~JP$9cx<e:b.uq4s!V,u",
    "REFRESH_TOKEN_SECRET": "L/ZX[J*Cxs@z8rztCX.qW\yNTyaZ<zEN_$3aAA\\9r4;*Mq-#PbncP`8,39BBy#?w.w)}\"2R`C-GpdX'Y",
    "PAYPAL_CLIENT_ID": "AbSQ_4b5kVcPtOMyH3jPdMJVgk0vLB_Jsv8UMQvYltvb_KyJ-u3NGIcJtBLTOTCSiYC9SZleyOQuzDeC",
    "CLOUD_UPDATE_PRESET": "next_store",
    "CLOUD_NAME": "daskcm9jk",
    "CLOUD_API": "https://api.cloudinary.com/v1_1/daskcm9jk/image/upload"
  },
  
}

module.exports = nextConfig
