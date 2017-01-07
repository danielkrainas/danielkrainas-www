import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

const logger = createLogger({})

export let store = createStore((state, action) => state, {}, applyMiddleware(logger))