import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
// import {Provider} from 'react-redux'
import routes from '../client/routes'

// const store = configureStore()

async function clientRoute(ctx, next) {
    let _renderProps

    match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
        _renderProps = renderProps
    })

    if (_renderProps) {
        await ctx.render('index', {
            root: renderToString(
              <RouterContext {..._renderProps}/>
            ),
            state: ''
        })
    } else {
        await next()
    }
}

export default clientRoute
