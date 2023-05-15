import cookie from 'cookie';

const MAX_TIME = 7 * 24 * 60 * 60;

export const setTokenCookie = (token, res) => {
    const setCookie = cookie.serialize('token', token, {
        maxAge: MAX_TIME,
        expires: new Date(Date.now() + MAX_TIME*1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
    res.setHeader('Set-Cookie', setCookie);
}