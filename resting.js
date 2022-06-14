/* 
* Resging
*
* Usage ----------------------------------------------
* (-) Fetch /wp-json/, (2) Sub-objects, (3) Call function App.restResponse, (4) Set Cache
* (1) resting.fetch('/wp-json/', [  ], (App.restResponse), true); 
* (2) resting.fetch('/wp-json/', [ 'name' ], (App.restResponse), false);
*
* Reqirements ---------------------------------------
* (1) cacher.js must be included in this package
*/


import cacher from './cacher.js'

const resting = {
    state: {},
    url: {
        home:  window.location.protocol + '//' + window.location.host,
    },
    fetch: (url, route, callback, cache) => {

        // * Abort Controller
        const controller = new AbortController();
        const signal = controller.signal;
        // controller.abort(); // Abort the request
        

        // Cache
        if(cacher.check(url) && cache) {
            let data = cacher.retrieve(url);
            resting.callback(data, callback, route);
            return;
        };


        let fetchUrl = resting.url.home +  url;
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
            fetchUrl = url;
        }

   
        // Fetch
        fetch(fetchUrl, { signal: controller.signal } )
            .then(response => response.json())
            .then(data => {
                resting.callback(data, callback, route);
               
                // Store to cache
                if(cache) {
                    cacher.store(url, data)
                }
        });
    },
    callback: (data, callback, route) => {
        (route.length == 0 || !route) ? callback(data) : null;
        (route.length == 1) ? callback(data[route[0]]) : null;
        (route.length == 2) ? callback(data[route[0]][route[1]]) : null;
        (route.length == 3) ? callback(data[route[0]][route[1]][route[2]]) : null;
        (route.length == 4) ? callback(data[route[0]][route[1]][route[2]][route[3]]) : null;
        (route.length == 5) ? callback(data[route[0]][route[1]][route[2]][route[3]][route[4]]) : null;
    }
}

export { resting as default }