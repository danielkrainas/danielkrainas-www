import _ from 'lodash'
import { routeChanged, showHome } from './store-actions'
import { GO_ROUTE } from './store-states'

const ROUTE_HOME = 'home'

export function routeReducer(state, action) {
    state = _.merge({}, state, {
        route: {
            name: action.route,
            params: action.params,
            query: action.query
        }
    })

    switch (action.route) {
        case ROUTE_HOME:
            break
    }

    return state
}

export function dispatchRoutes(route, store) {
    route('/', () => {
        store.dispatch(routeChanged(ROUTE_HOME))
    })

    // default
    route(() => {
        store.dispatch(showHome())
    })
}

export function routingAdapter(route) {
    return store => next => action => {
        if (action.type == GO_ROUTE) {
            console.log('go route ', action.path)
            route(action.path)
            return
        }

        next(action)
    }
}

export function routeMixin(route) {
    return { route }
}