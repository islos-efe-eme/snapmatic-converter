import fs from 'fs'
import { SnapConverter } from '../../../src'
import { download } from './helpers/downloadFile'

jest.setTimeout(20000) // in milliseconds

const src = `${__dirname}/data/`
const dst = src

const testImages = [
  'PGTA5304958339',
  'PGTA51370982198',
  'PGTA5702817641',
]

const IMAGE_EXTENSION = 'jpg'

describe('Snapmatic', () => {
  beforeAll(async (done) => {
    // Create data directory before all
    if (!fs.existsSync(src)) {
      fs.mkdirSync(src)
    }
    // Download test images before all tests start to run
    const promises = []
    for (const testImage of testImages) {
      promises.push(download(testImage, src))
    }
    await Promise.all(promises)
    done()
  })
  afterAll(() => {
    // Delete test images after all tests are done
    if (fs.existsSync(src)) {
      fs.rmdirSync(src, { recursive: true })
    }
  })
  afterEach(() => {
    // Delete generated files after each test
    const regex = /.*jpg.*$/
    fs.readdirSync(src)
      .filter(f => regex.test(f))
      .map(f => fs.unlinkSync(src + f))
  })

  // Getters
  it('Get source path.', () => {
    const temp = new SnapConverter(src, dst)
    expect(typeof temp.srcPath).toBe('string')
    expect(temp.srcPath).toEqual(src)
  })

  it('Get destination path.', () => {
    const temp = new SnapConverter(src, dst)
    expect(typeof temp.dstPath).toBe('string')
    expect(temp.dstPath).toEqual(dst)
  })

  it('Get default source path.', () => {
    const temp = new SnapConverter()
    expect(typeof temp.srcPath).toBe('string')
    expect(temp.srcPath).toEqual('/tmp/source')
  })

  it('Get default destination path.', () => {
    const temp = new SnapConverter()
    expect(typeof temp.dstPath).toBe('string')
    expect(temp.dstPath).toEqual('/tmp/converted')
  })

  // Create
  it('Create new directory that does not exist.', () => {
    const temp = new SnapConverter()
    const path = '/tmp/test'
    temp.createDstDir.bind(temp.createDstDir, path)
    expect(fs.existsSync(path)).toBeTruthy()
  })

  // Convert
  it('Convert all files in directory.', () => {
    const temp = new SnapConverter(src, dst)
    const filesBefore = fs.readdirSync(dst)
    expect(filesBefore.length).toBe(testImages.length)
    temp.convertAllFiles()
    const filesAfter = fs.readdirSync(dst)
    expect(filesAfter.length).toBe(6)
    expect(filesAfter.filter(file => file.includes(IMAGE_EXTENSION)).length).toBe(testImages.length)
    expect(filesAfter.filter(file => !file.includes(IMAGE_EXTENSION)).length).toBe(testImages.length)
  })

  it('Convert one file in directory.', () => {
    const temp = new SnapConverter(src, dst)
    const filesBefore = fs.readdirSync(dst)
    expect(filesBefore.length).toBe(testImages.length)
    temp.convertSingleFile(testImages[0])
    const filesAfter = fs.readdirSync(dst)
    expect(filesAfter.length).toBe(4)
    expect(filesAfter.filter(file => file.includes(IMAGE_EXTENSION)).length).toBe(1)
    expect(filesAfter.filter(file => !file.includes(IMAGE_EXTENSION)).length).toBe(testImages.length)
  })

  it('Convert a set of files in directory.', () => {
    const temp = new SnapConverter(src, dst)
    const filesBefore = fs.readdirSync(dst)
    expect(filesBefore.length).toBe(testImages.length)
    temp.convertSomeFiles(testImages)
    const filesAfter = fs.readdirSync(dst)
    expect(filesAfter.length).toBe(testImages.length + testImages.length)
    expect(filesAfter.filter(file => file.includes(IMAGE_EXTENSION)).length).toBe(testImages.length)
    expect(filesAfter.filter(file => !file.includes(IMAGE_EXTENSION)).length).toBe(testImages.length)
  })
})
