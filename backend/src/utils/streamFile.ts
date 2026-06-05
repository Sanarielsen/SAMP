import fs from 'fs'
import { pipeline } from 'stream/promises'

export async function pumpStreamToFile(
  stream: any,
  filePath: string
) {
  await pipeline(
    stream,
    fs.createWriteStream(filePath)
  )
}