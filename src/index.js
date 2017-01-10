import riot from 'riot'
import route from 'riot-route'
import reduxMixin from 'riot-redux-mixin'
import { storeFactory, dispatchRoutes, routingAdapter, routeMixin, routeReducer } from './app'

import './app/social.tag'
import './app/contact.tag'
import './app/app.tag'

let store = storeFactory({
	reducers: [routeReducer],
	middleware: [routingAdapter(route)]
})

// subscribe to routes and dispatch events to the store
dispatchRoutes(route, store)

riot.mixin('redux', reduxMixin(store))
riot.mixin('route', routeMixin(store))
riot.mount('*', {})

// start routing
route.base('/')
route.start(true)