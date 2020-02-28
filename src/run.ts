#!/usr/bin/env node
import { SnapConverter } from '.'
import { SNAP_CONFIG, INFO_MESSAGES } from './helpers'

// Check number of arguments
if (process.argv.length != 4) {
  console.log(INFO_MESSAGES.USAGE_HELP)
  process.exit(-1)
}

// Take process.argv[2] and process.argv[3]
const [,, src, dst] = process.argv

// Print src and dst if DEBUG=1
if (SNAP_CONFIG.DEBUG) {
  console.log(`src: ${src}\ndst: ${dst}`)
}

// Create converter instance
const converter = new SnapConverter(src, dst)

// Convert all files found
converter.convertAllFiles()
