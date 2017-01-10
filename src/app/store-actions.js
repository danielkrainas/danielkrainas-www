import { GO_ROUTE, ROUTE_CHANGED } from './store-states'

export function routeChanged(route, params = {}, query = {}) {
	return {
		type: ROUTE_CHANGED,
		route,
		params,
		query
	};
}

export function showHome() {
	return goRoute('/')
}

export function goRoute(...path) {
	if (path.length === 1) {
		path = path[0]
	} else {
		path = path.join('')
	}

	return {
		type: GO_ROUTE,
		path: path
	}
}