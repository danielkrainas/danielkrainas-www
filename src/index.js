import riot from 'riot'
import reduxMixin from 'riot-redux-mixin'
import { store } from './app'

import './app/social.tag'
import './app/contact.tag'
import './app/app.tag'

riot.mixin('redux', reduxMixin(store))
riot.mount('*', {})
