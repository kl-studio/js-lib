import lib from './lib.js';
import cacher from './cacher.js';

const modifier = {
    init : (state, callback) => {
        lib.qsa('[modifier]').forEach(modifierInput => {
            let modName = modifierInput.getAttribute('modifier');

            lib.qsa('[if-' + modName + ']').forEach(ifmod => {
                if(!ifmod.dataset.default) {
                    ifmod.style.visibility  = 'hidden';
                    ifmod.style.marginLeft  = '-9999px';
                    ifmod.style.position = 'absolute';
                }
            });

            modifierInput.addEventListener('click', () => {
                let option = modifierInput.getAttribute('option');

                if(option) {
                    let value;

                    if(modifierInput.nodeName == 'INPUT') {
                        value = option;
                    }

                    if(modifierInput.nodeName == 'SPAN' || modifierInput.nodeName == 'DIV' || modifierInput.nodeName == 'P'|| modifierInput.nodeName == 'LI' || modifierInput.nodeName == 'H1' || modifierInput.nodeName == 'H2' || modifierInput.nodeName == 'H3' || modifierInput.nodeName == 'H4' || modifierInput.nodeName == 'H5' || modifierInput.nodeName == 'H6') {
                        value = option;
                    }
                    
                    modifier.updateState(state, modName, value);
                    modifier.render(state, callback);
                }     
            });

            modifierInput.addEventListener('input', () => {
                let value;

                if(modifierInput.nodeName == 'INPUT') {
                    value = modifierInput.value;
                }

                lib.qsa('[' + modName + ']').forEach(mod => {
                    if(!modifierInput.getAttribute('value')){
                        // Standard Element
                        if(mod.nodeName == 'SPAN' || mod.nodeName == 'DIV' || mod.nodeName == 'P' || mod.nodeName == 'H1' || modifier.nodeName == 'LI' || mod.nodeName == 'H2' || mod.nodeName == 'H3' || mod.nodeName == 'H4' || mod.nodeName == 'H5' || mod.nodeName == 'H6') {
                            mod.innerHTML = value;
                        }
                    }
                    //Input Element
                    if(mod.nodeName == 'INPUT') {
                        mod.value = value;
                    }

                    if(mod.dataset.default && mod.innerHTML == '') {
                        mod.innerHTML = mod.dataset.default;
                    }
                });

                modifier.updateState(state, modName, value);

            });
        });
    },
    updateState: (state, mod, value) => {
            // Manage if-state-name
            lib.qsa('[if-' + mod + ']').forEach(ifmod => {

                if(value) {
                    ifmod.style.visibility  = 'visible';
                    ifmod.style.marginLeft  = '0px';
                    ifmod.style.position = 'relative';
                } else {
                    ifmod.style.visibility  = 'hidden';
                    ifmod.style.marginLeft  = '-9999px';
                    ifmod.style.position = 'absolute';
                }
            });

             //Update State Value
             mod = mod.split("-");
             // Scan to Store
             if(mod.length == 2) { state[mod[1]] = value }
             if(mod.length == 3) { state[mod[1]][mod[2]] = value }
             if(mod.length == 4) { state[mod[1]][mod[2]][mod[3]] = value }
             if(mod.length == 5) { state[mod[1]][mod[2]][mod[3]][mod[4]] = value }
            // Update Cache
            modifier.cacherStore(mod[1], state[mod[1]]);
        
    },
    cacherStore: (key, value) => {
        // Use Cahcer to Store Cached State
        cacher.store(key, value);
    },
    render: (state, callback) => {

        let arr = [];

        lib.qsa('[modifier]').forEach(modi => {
            arr.push(modi.getAttribute('modifier'));
        });

        arr = arr.filter((item, 
            index) => arr.indexOf(item) === index);

        arr.forEach(mods => {
            let modClass = mods.split("-");
            lib.qsa('[' + mods + ']').forEach(mod => {

                let option = mod.getAttribute('option');

                if(!option) {
                // Load Input Values
                    if(mod.nodeName == 'INPUT') {
                        if(modClass.length == 2) { mod.value = state[modClass[1]] }
                        if(modClass.length == 3) { mod.value = state[modClass[1]][modClass[2]] }
                        if(modClass.length == 4) { mod.value = state[modClass[1]][modClass[2]][modClass[3]] }
                        if(modClass.length == 5) { mod.value = state[modClass[1]][modClass[2]][modClass[3]][modClass[4]] }
                    }

                    if(mod.nodeName == 'SPAN' || mod.nodeName == 'DIV' || mod.nodeName == 'P' || mod.nodeName == 'H1' || modifier.nodeName == 'LI' || mod.nodeName == 'H2' || mod.nodeName == 'H3' || mod.nodeName == 'H4' || mod.nodeName == 'H5' || mod.nodeName == 'H6') {
                        if(modClass.length == 2) { mod.innerHTML = state[modClass[1]] }
                        if(modClass.length == 3) { mod.innerHTML = state[modClass[1]][modClass[2]] }
                        if(modClass.length == 4) { mod.innerHTML = state[modClass[1]][modClass[2]][modClass[3]] }
                        if(modClass.length == 5) { mod.innerHTML = state[modClass[1]][modClass[2]][modClass[3]][modClass[4]] }

                        if(mod.dataset.default && mod.innerHTML == '') {
                            mod.innerHTML = mod.dataset.default;
                        }
                    }
                }

                lib.qsa('[modifier="' + mods + '"]').forEach(ifmod => {
                    let getState;
                    if(modClass.length == 2) { getState = state[modClass[1]] }
                    if(modClass.length == 3) { getState = state[modClass[1]][modClass[2]] }
                    if(modClass.length == 4) { getState = state[modClass[1]][modClass[2]][modClass[3]] }
                    if(modClass.length == 5) { getState = state[modClass[1]][modClass[2]][modClass[3]][modClass[4]] }

                    ifmod.classList.remove('active');

                    if(ifmod.getAttribute('option') == getState) {
                        ifmod.classList.add('active');
                    }
                });

                lib.qsa('[if-' + mods + ']').forEach(ifmod => {

                    let value;
                    if(modClass.length == 2) { value = state[modClass[1]] }
                    if(modClass.length == 3) { value = state[modClass[1]][modClass[2]] }
                    if(modClass.length == 4) { value = state[modClass[1]][modClass[2]][modClass[3]] }
                    if(modClass.length == 5) { value = state[modClass[1]][modClass[2]][modClass[3]][modClass[4]] }

                        if(value) {
                            if(value == ifmod.getAttribute('if-' + mods)) {
                                ifmod.style.visibility  = 'visible';
                                ifmod.style.marginLeft  = '0px';
                                ifmod.style.position = 'relative';
                            } else {
                                ifmod.style.visibility  = 'hidden';
                                ifmod.style.marginLeft  = '-9999px';
                                ifmod.style.position = 'absolute';
                            }
                                
                            if(!ifmod.getAttribute('if-' + mods)) {
                                // console.log(ifmod);
                                ifmod.style.visibility  = 'visible';
                                ifmod.style.marginLeft  = '0px';
                                ifmod.style.position = 'relative';
                            }
                        } else {

                            ifmod.style.visibility  = 'hidden';
                            ifmod.style.marginLeft  = '-9999px';
                            ifmod.style.position = 'absolute';
                            
                        }
                });
            });
        })

          // Callback
          if(callback){
            callback()
        }
    }
}


export { modifier as default }