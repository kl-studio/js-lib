// USAGE:
/* ELEMENT, CLASS TO APPEND, IDENTIFIER
/* _$(`<span class="close"></span>`, '.article-body', 1) */

import lib from "./lib";

const _$ = (str, qs, identifier) => {
    // Init DOM Parser
    let doc = new DOMParser().parseFromString(str, 'text/html');
    let elem = lib.qs(qs);
    let e = lib.qs(['[_s="' + identifier + '"]'])

    if(e) {
        e.remove(); // If node exists, remove it
    }

    // Create New Node
    elem.insertAdjacentHTML('beforeend', doc.body.innerHTML);
    elem.children[elem.children.length - 1].setAttribute('_s', identifier);
    return elem.children[elem.children.length - 1];
}

export { _$ }