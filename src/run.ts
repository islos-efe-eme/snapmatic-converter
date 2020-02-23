#!/usr/bin/env node
import { SnapConverter } from '.'
import { SNAP_CONFIG } from './helpers'

// start process if correct number of arguments was passed
if (process.argv.length != 4) {
  console.log(
    'Usage:  snapmatic-converter <source folder> <destination folder>'
  )
  process.exit(-1)
}
const src = process.argv[2]
const dst = process.argv[3]
SNAP_CONFIG.DEBUG && console.log('src ', src)
SNAP_CONFIG.DEBUG && console.log('dst ', dst)
const converter = new SnapConverter(src, dst)
converter.convertAllFiles()
