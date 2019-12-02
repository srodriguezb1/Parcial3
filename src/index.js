import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import ListPeliculas from './components/listPeliculas';

import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

import {IntlProvider} from 'react-intl';

let idioma= ()=>{
    console.log(navigator.language||navigator.browserLanguage)
    return navigator.language||navigator.browserLanguage;
}

let messages =() =>{

    if(idioma() ==="es" || idioma()==="es-ES"){
        return localeEsMessages;
    }
    else if(idioma() === "en"){
        return localeEnMessages;
    }
}

ReactDOM.render(<IntlProvider locale={idioma()} messages= {messages()}>
                    <ListPeliculas idm = {idioma()}/>
                </IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
