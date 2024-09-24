export { AosHandler, type AosOptions, getInstance as getAosInstance, plugin as installAos } from './aos'

export {
  installToaster,
  ToasterHandler,
  type ToasterOptions,
  type ToasterPosition,
  type ToasterPositions,
} from './toaster'

export { instance as waitInstance, plugin as installWait, WaitHandler } from './wait'
