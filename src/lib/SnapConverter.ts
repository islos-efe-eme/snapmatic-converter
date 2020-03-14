import fs from 'fs'
import path from 'path'
import {
  SNAP_CONFIG,
  ERROR_MESSAGES,
  INFO_MESSAGES,
} from '../helpers'
class SnapConverter {
  private _srcPath: string
  private _dstPath: string

  /**
   * Class constructor
   * @param srcPath The path where Snapmatic files are located.
   * @param dstPath The path where output files are located.
   */
  constructor(
    srcPath = `${SNAP_CONFIG.BASE_DIR}/source`,
    dstPath = `${SNAP_CONFIG.BASE_DIR}/converted`
  ) {
    this._srcPath = path.normalize(srcPath)
    this._dstPath = path.normalize(dstPath)
  }

  // Getter for srcPath property
  get srcPath(): string {
    return this._srcPath
  }

  // Setter for srcPath property
  set srcPath(path: string) {
    this._srcPath = path
  }

  // Getter for dstPath property
  get dstPath(): string {
    return this._dstPath
  }

  // Setter for dstPath property
  set dstPath(path: string) {
    this._dstPath = path
  }

  /**
   * Converts one single Snapmatic image to JPEG.
   * @param fileName The name of the file.
   */
  convertSingleFile(fileName: string | boolean = false): void {
    if (typeof fileName !== 'string') {
      throw new Error(ERROR_MESSAGES.INVALID_FILENAME)
    }
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.ANALYZING_FILE)
    const file = this.getFile(fileName)
    if (!file) {
      throw new Error(ERROR_MESSAGES.FILE_NOT_FOUND)
    }
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.CREATING_DST_FOLDER)
    this.createDstDir(this.dstPath)
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.CONVERTING_FILE)
    const mergedPath = path.join(this.srcPath, file)
    const convertedImg = this.convert(this.fileToBuffer(mergedPath))
    this.writeFile(path.join(this.dstPath, file), convertedImg)
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.DONE)
  }

  // Starts the transformation process iteratively over all Snapmatic files.
  convertAllFiles(): void {
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.ANALYZING_FILE)
    const files = this.getAllFiles()
    if (!files || !Array.isArray(files) || !files.length) {
      throw new Error(ERROR_MESSAGES.FILES_NOT_FOUND)
    }
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.CREATING_DST_FOLDER)
    this.createDstDir(this.dstPath)
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.CONVERTING_FILE)
    for (const file of files) {
      const convertedImg = this.convert(
        this.fileToBuffer(path.join(this.srcPath, file))
      )
      this.writeFile(path.join(this.dstPath, file), convertedImg)
    }
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.DONE)
  }

  // Starts the transformation process iteratively over some Snapmatic files.
  convertSomeFiles(files: string[]): void {
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.ANALYZING_FILE)
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.CREATING_DST_FOLDER)
    this.createDstDir(this.dstPath)
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.CONVERTING_FILE)
    for (const file of files) {
      const pathJoin = path.join(this.srcPath, file)
      const convertedImg = this.convert(this.fileToBuffer(pathJoin))
      this.writeFile(pathJoin, convertedImg)
    }
    SNAP_CONFIG.DEBUG && console.debug(INFO_MESSAGES.DONE)
  }

  // Writes the converted image into the destination path.
  writeFile (filePath: string, data: any): void {
    fs.writeFileSync(`${filePath}.jpg`, data)
  }

  // Gets the file buffer.
  fileToBuffer (filePath: string): Buffer {
    const tempBuffer = fs.readFileSync(filePath)
    return tempBuffer
  }

  // Creates a new directory for storing the converted images.
  createDstDir(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  // Gets all the Snapmatic files
  getAllFiles(): string[] {
    const srcPathExists = fs.existsSync(this.srcPath)

    if (!srcPathExists) {
      throw new Error(ERROR_MESSAGES.SRC_DIR_DOES_NOT_EXIST)
    }

    const result = fs
      .readdirSync(this.srcPath)
      .filter(file => file.startsWith('PGTA'))

    return result
  }

  // Get one single Snapmatic file
  getFile(fileName: string): string | undefined {
    const result = this.getAllFiles().find(file => file === fileName)
    return result
  }

  // Converts a file from a Buffer
  convert(file: Buffer): Buffer {
    // Since the use of new Buffer() is deprecated, Buffer.from() should be used instead:
    // https://nodejs.org/en/docs/guides/buffer-constructor-deprecation/
    const converted = file.slice(
      file.indexOf(Buffer.from([0xff, 0xd8])),
      file.length
    )
    return converted
  }
}

export { SnapConverter }
