import path from 'path'

import { aliasResolve } from './module-resolver'

const moleculerModules = (paths, namespace = '') => {
  const fullPaths = paths.map(pathname => path.resolve(`node_modules/moleculer/src/${namespace}/${pathname}`))
  return [
    ...paths,
    ...fullPaths
  ]
}

const builtInModules = [
  'moleculer',
  'moleculer-repl'
]

const transporters = moleculerModules([
  './amqp',
  './mqtt',
  './nats',
  './kafka',
  './tcp',
  './stan'
], 'transporters')

const cachers = moleculerModules([
  './redis'
], 'cachers')

const strategies = moleculerModules([
  './cpu-usage'
], 'strategies')

const serializers = moleculerModules([
  // serializers
  './avro',
  './msgpack',
  './notepack',
  './protobuf',
  './thrift'
], 'serializers')

let aliasModules = aliasResolve([
  ...transporters,
  ...cachers,
  ...strategies,
  'moleculer-repl'
], 'src/fallback/non-compatible.js')

aliasModules = aliasResolve([
  ...serializers
], 'src/fallback/unloaded-serializer.js', aliasModules)

aliasModules['./cpu-usage'] = path.resolve('src/cpu-usage.js')
aliasModules['./logger'] = path.resolve('src/logger.js')

export {
  aliasModules,

  builtInModules
}
