export type routeObject = {
    name: string,
    component: any,
    active?: boolean,
    guard?: (current: routeObject, target: routeObject) => boolean,
    params?: object
}