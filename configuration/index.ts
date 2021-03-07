export const serverAPIPort = 3232;
export const host = 'http://localhost'

export const APIDomain = 'tickets';

export const APIPath = `/api/${APIDomain}`;
export const APIRootPath = `${host}:${serverAPIPort}${APIPath}`

export const API_Clone_Path = `/api/clone`;
export const APIRootClonePath = `${host}:${serverAPIPort}${API_Clone_Path}`

export const API_Delete_Path = `/api/delete`;
export const APIRootDeletePath = `${host}:${serverAPIPort}${API_Delete_Path}`


export const API_Change_Path = `/api/change`;
export const APIRootChangePath = `${host}:${serverAPIPort}${API_Change_Path}`


export const APITryPath = `/api/try`;
export const APIRootTryPath = `${host}:${serverAPIPort}${APITryPath}`


export const API_Pages_Amount_Path = `/api/amount`;
export const APIRootPagesAmountPath = `${host}:${serverAPIPort}${API_Pages_Amount_Path}`

export const staticsPort = 3000;
export const staticsUrl = `${host}:${staticsPort}/`;
export const DynamicUrl = `${host}:${serverAPIPort}`
