const shouldLog = (): boolean => process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
export const SNAP_CONFIG = {
  DEBUG: shouldLog() ? 1 : 0,
  BASE_DIR: '/tmp',
}
