export const configGoogle = {
    issuer: 'https://accounts.google.com',
    clientId: '572230799761-0n9krkk51jvvqt64gjvrhvtqhirp7ptc.apps.googleusercontent.com',
    redirectUrl: 'https://spoiq.elementaryone.com/api/values',
    scopes: ['openid', 'profile']
}

export const configFacebook = {
    issuer: 'https://facebook.com',
    clientId: 'SECRET',
    redirectUrl: 'http://spoiq.elementaryone.com/',
    scopes: ['openid', 'profile']
}

export const configSpoIQ = {
    issuer: 'http://3.213.201.221/',
    route: 'api/Users/authenticate',
}
