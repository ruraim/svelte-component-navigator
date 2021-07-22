export type routeObject = {
    name: string,
    component: any,
    active?: boolean,
    guards?: () => boolean,
    params?: object
}