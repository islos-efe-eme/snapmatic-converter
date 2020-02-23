import Fs from 'fs'
import Path from 'path'
import Axios from 'axios'


const S3_BUCKET = 'https://gta-tools-files.s3-us-west-2.amazonaws.com/'

export const download = async (filename: string, targetPath: string): Promise<void> => {
  const url = `${S3_BUCKET}${filename}`
  const path = Path.resolve(targetPath, filename)
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
