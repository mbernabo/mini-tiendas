const setHeaders = (accessToken, extra = null) => {

    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        ...extra,
    };
};

export { setHeaders };
