import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'

const logger = createLogger({})

export const storeFactory = ({ reducers, middleware }) => {
	reducers = reducers || []
	middleware = middleware || []
	return createStore(combineReducers(reducers), {}, applyMiddleware(logger, ...middleware))
}
