import { r2CloudflareConf } from "@shared/config";
import { S3Client, write } from "bun";

const s3 = new S3Client({
  accessKeyId : r2CloudflareConf.R2_CLOUDE_FLARE_ACCESS_KEY,
  secretAccessKey : r2CloudflareConf.R2_CLOUDE_FLARE_SEVER_KEY,
  endpoint : r2CloudflareConf.R2_CLOUDE_FLARE_ENDPOINT,
  bucket: r2CloudflareConf.R2_CLOUDE_FLARE_BUCKET
});

export const getSignedUrlUpload = async (
  path : string,
  bucket : string,
  fileType : string,
  expiresIn = 300
) => 
  s3.presign(
    path, {
      bucket : bucket,
      method : "PUT",
      type : fileType,
      expiresIn,
    }
  );

export const upload = async (
  path : string,
  file : File
) => {
  await write(path, file)
};