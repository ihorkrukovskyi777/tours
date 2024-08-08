export function setCookieSession(name,value) {
    document.cookie = `${name}=${value}; path=/`;
}
