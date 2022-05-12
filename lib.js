/* 
* Pager
* BASED ON INTLY.JS
*
* Usage ----------------------------------------------
* (1) Query Selector All: qsa('.classname').forEach()
* (2) Query Selector: sq('.classname').classList.add('helloworld')
* (3) Body Selector: bod.classList.add('helloworld')
* (4) ID Selector: id('id').classList.add('helloworld')
*/

const lib = {
    qsa: (name, loc = document) => {
        return [...loc.querySelectorAll(name)]
    },
    qs: (name, loc = document) => {
        return loc.querySelector(name)
    },
    bod: () => {
        return lib.qs('body')
    },
    id: (name) => {
        return document.getElementById(name)
    },
    path: (name) => {
        if(name) {
            return (window.location.pathname == name) ? true : false;
        }

        return window.location.pathname;
    },
    elem: (elem, html) => {
        var wrapper = document.createElement(elem);
        wrapper.innerHTML = html;
        return wrapper.firstChild;
    },
    append: (name) => {
     
    },
    stylesheet: {
        add: (url, id) => {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.id = id;
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        remove: (id) => {
            if(!lib.id(id)) {
                return;
            }
            lib.id(id).remove();
        }
    }
}

export { lib as default }
