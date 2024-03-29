/**
mkdir store-directory
cd store-directory

npm install nft.storage files-from-path
*/
import {NFTStorage}from 'nft.storage'
import {filesFromPaths} from 'files-from-path'
import path from 'path'
import fs from 'fs'

//const token = ''

async function main(){
  if(process.argv.length !== 4){
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <token> <directory-path>`)
  }

  const token = process.argv[2]
  const storage = new NFTStorage({token})

  const directoryPath = process.argv[3]
  const files = filesFromPaths(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
 })

  console.log(`storing ${directoryPath}`)
  const cid = await storage.storeDirectory(files)

  fs.appendFile('log.txt', directoryPath+'\t'+cid+'\n', function(err){
    if(err) throw err
    console.log('Saved!')
 });

  console.log({cid})
  //const status = await storage.status(cid)
  //console.log(status)
}
main()
