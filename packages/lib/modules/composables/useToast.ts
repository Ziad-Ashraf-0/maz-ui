import type { ToasterHandler } from '../plugins/toaster'
import { injectStrict } from '../helpers/inject-strict'

export function useToast() {
  return injectStrict<ToasterHandler>('toast')
}
