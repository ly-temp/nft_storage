/**
mkdir store-directory
cd store-directory

npm install nft.storage files-from-path
*/
import { NFTStorage } from 'nft.storage'
import { filesFromPath } from 'files-from-path'
import path from 'path'
import fs from 'fs'

//const token = ''

async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 4) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <token> <directory-path>`)
  }

  const token = process.argv[2]
  const storage = new NFTStorage({ token })

  const directoryPath = process.argv[3]
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  })

  console.log(`storing file(s) from ${directoryPath}`)
  const cid = await storage.storeDirectory(files)

  fs.appendFile('log.txt', directoryPath+': '+cid+'\n', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  console.log({ cid })
  //const status = await storage.status(cid)
  //console.log(status)
}
main()