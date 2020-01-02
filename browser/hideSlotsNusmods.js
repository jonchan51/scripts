// ==UserScript==
// @name         Hide irrelevant timeslots
// @namespace    https://github.com/jonchan51
// @version      1.0
// @description  Hide irrelevant timeslots from view
// @author       jonchan51
// @match        https://nusmods.com/timetable*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // replace this array with the slots you want to hide. typically named as
    // MODULECODE-TYPEOFCLASS-NUMBER
    let slotsToHide = ["CS2100-LEC-1", "CS2100-TUT-10"];

    for (let slot of slotsToHide) {
        let blocks = document.getElementsByClassName(slot);
        for (let block of blocks) {
            block.style.visibility = "hidden";
        }
    }
})();
