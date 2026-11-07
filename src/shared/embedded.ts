/**
 * Color & Noise integration: FreeCut is framed by a host app on the same
 * origin. When embedded, the marketing landing page is skipped and the
 * editor is the entry.
 */
export function isEmbedded(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.self !== window.top
  } catch {
    return true
  }
}
