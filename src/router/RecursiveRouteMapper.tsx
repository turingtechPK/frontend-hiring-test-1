import { Route as ReactRoute } from "react-router-dom"

import { Route } from "./routes"

export const RecursiveRouteMapper = (routes: Route[]) => {
  return routes.map((route, index) => (
    <ReactRoute
      caseSensitive={route.caseSensitive}
      index={route.index}
      key={route.path ?? index}
      path={route.path}
      element={route.element}
    >
      {route.children ? RecursiveRouteMapper(route.children) : null}
    </ReactRoute>
  ))
}
