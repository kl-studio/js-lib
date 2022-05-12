/* 
* Pager
* BASED ON INTLY.JS
*
* Usage ----------------------------------------------
* (1) Retrieve the State Values: state['theme'] = (stateManagement.retrieve('theme')) ? stateManagement.retrieve('theme') : state.theme; 
* (2) Store the State Values:  stateManagement.store('theme', state.theme)
*/

const cacher = {
    state: {},
    store: (name, state) => {
        localStorage.setItem(name, JSON.stringify(state))
    },
    retrieve: (name) => {
        return JSON.parse(localStorage.getItem(name))
    },
    check: (name) => {
        return localStorage.hasOwnProperty(name)
    }
}

export { cacher as default }