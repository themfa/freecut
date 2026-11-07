/**
 * Color & Noise integration: FreeCut can be served under a sub-path (the host
 * app routes /video/* here). Vite's BASE_URL carries that base; these helpers
 * keep every place that reads or writes window.location.pathname base-aware.
 */
export const BASE_URL: string = import.meta.env.BASE_URL || '/'

/** "/video" for a base of "/video/", "" for a root deployment. */
export const BASE_PATH: string = BASE_URL.replace(/\/$/, '')

/** The pathname as the router sees it: without the base prefix. */
export function stripBasePath(pathname: string): string {
  if (BASE_PATH.length === 0) return pathname
  if (pathname === BASE_PATH) return '/'
  return pathname.startsWith(BASE_PATH + '/') ? pathname.slice(BASE_PATH.length) : pathname
}

/** Prefix an app-relative path ("/editor/abc") with the base for use in href/location. */
export function withBasePath(path: string): string {
  return path.startsWith('/') ? BASE_PATH + path : path
}
