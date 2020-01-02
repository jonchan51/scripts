// ==UserScript==
// @name         Reveal download button on Panopto
// @namespace    https://github.com/jonchan51
// @version      1.0
// @description  Reveals and adds download link to hidden download button on Panopto
// @author       jonchan51
// @match        https://nuscast.ap.panopto.com/Panopto/Pages/Viewer.aspx?*
// @grant        none
// ==/UserScript==

// Tested with TamperMonkey on FireFox

(function() {
    'use strict';

    let downloadButton = document.getElementById("podcastDownload");

    // AJAX makes original downloadButton hidden,
    // so create new node instead and differentiate from original
    let newDownloadButton = downloadButton.cloneNode(true);
    newDownloadButton.setAttribute("id", "newDownloadButton");

    // remove ?id= from search params
    let id = window.location.search.substring(4);

    let downloadUrl = "https://nuscast.ap.panopto.com/Panopto/Podcast/Social/" + id + ".mp4";

    newDownloadButton.addEventListener("click", () => window.open(downloadUrl, "_blank"));
    newDownloadButton.style.visibility = "visible";

    downloadButton.parentElement.prepend(newDownloadButton);
})();
