export const serverAPIPort = 3232;
export const host = 'http://localhost'

export const APIDomain = 'tickets';
export const APIPath = `/api/${APIDomain}`;
export const APIRootPath = `${host}:${serverAPIPort}${APIPath}`

export const APIClonePath = `/api/clone`;
export const APIRootClonePath = `${host}:${serverAPIPort}${APIClonePath}`

export const APIDeletePath = `/api/delete`;
export const APIRootDeletePath = `${host}:${serverAPIPort}${APIDeletePath}`


export const APIChangePath = `/api/change`;
export const APIRootChangePath = `${host}:${serverAPIPort}${APIChangePath}`

export const staticsPort = 3000;
export const staticsUrl = `${host}:${staticsPort}/`;
export const DynamicUrl = `${host}:${serverAPIPort}`
