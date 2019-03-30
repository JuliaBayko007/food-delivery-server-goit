const getClearUrl = url => {
    const lastIndex = url.lastIndexOf('/');
    console.log(lastIndex);
    const idString = url.slice(lastIndex + 1).trim();
    const idNumber = +idString

    if (idNumber && lastIndex !== -1) {
        return url.slice(0, lastIndex);
    }

    return url;
};


const getRouteHandler = (routerConfig, url) => {
    const clearUrl = getClearUrl(url);
    const urlfirst = '/' + url.split('/')[1];
    console.log(routerConfig);
    console.log(routerConfig[urlfirst]);

    return routerConfig[urlfirst];
};

module.exports = getRouteHandler;
