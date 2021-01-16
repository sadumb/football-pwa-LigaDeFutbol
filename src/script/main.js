import { loadNav, loadPage } from './nav.js';

let page = window.location.hash.substr(1)
if(page == '') page = 'home';

document.addEventListener('DOMContentLoaded', function(){

    // SIDEBAR NAVIGATION
    loadNav();
    // Load page content
    loadPage(page);
})