function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function authFetch(url, options) {
    options = {
        credentials: 'same-origin',
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        },
    };
    const response = await fetch(url, options);
    return response;
}
export default authFetch;
