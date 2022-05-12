/* 
* Pager
* BASED ON INTLY.JS
*
* Usage ----------------------------------------------
* (-) Fetch /wp-json/, (2) Callback
* (1) resting.init('/wp-json/', callback ); 
* (2) resting.init('/wp-json/', callback );
*
* Reqirements ---------------------------------------
* (1) lib.js must be included in this package
* (2) cacher.js must be included in this package
*/

import lib from './lib.js';
import cacher from './cacher.js'

const pager = {
    url: {
        home:  window.location.protocol + '//' + window.location.host,
    },
    callback: (data, callback, url, clss) => {
        let parser = new DOMParser()
        let doc = parser.parseFromString(data, 'text/html')
        let temp = parser.parseFromString(`<div id="${clss}-temp" class="pager-item absolute"></div>`, 'text/html')
        let tgt = lib.qs('#' + clss)
        window.scroll({top: 0, left: 0, behavior: 'smooth'});

        tgt.parentNode.appendChild(
            lib.qs('#' + clss + '-temp', temp.documentElement)
        );

        // In
        lib.qs('#' + clss + '-temp').appendChild(doc.querySelector('#' + clss + ' > div'))
        window.history.replaceState( { additionalInformation: 'Updated the URL with JS' }, doc.title, window.location.origin + url )
        window.document.title = doc.title
        lib.qs('#' + clss + '-temp').classList.add('pager--ani-in')

        // Out
        lib.qs('#' + clss).classList.add('pager--ani-out')
        setTimeout(() => {
            lib.qs('#' + clss + '-temp').classList.remove('pager--ani-in')
            lib.qs('#' + clss + '-temp').id = clss
         
        }, 50)

        setTimeout(() => {
            lib.qs('#' + clss).remove()
        }, 1100)

        callback(data)
    },
    fetch: (url, callback, clss, cache) => {
        if(cacher.check(url) && cache) {
            let data = cacher.retrieve(url)
            pager.callback(data, callback, url, clss)
            return
        };

        fetch(pager.url.home +  url)
            .then(response => response.text())
            .then((data) => {
                (cache) ?  cacher.store(url, data) : null;
             
                pager.callback(data, callback, url, clss)
                pager.init(clss, callback, cache)
        });
    },
    init: (clss, callback, cache) => {
        lib.qs('#' + clss).classList.add('pager-item')
         lib.qsa('[' + clss + ']').forEach(a => {
            if(a.host == window.location.host) {
                a.addEventListener('click', (e) => {
                    e.preventDefault()
                    pager.fetch(a.pathname, callback, clss, cache)
                });
            }
        });
    },
}

export { pager as default }
