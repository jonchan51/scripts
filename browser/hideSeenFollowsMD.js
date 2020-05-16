// ==UserScript==
// @name         Hide seen chapters on Follows page on MangaDex
// @namespace    https://github.com/jonchan51
// @version      1.0
// @description  Hides chapters which have been seen on the Follows page.
// @author       jonchan51
// @match        https://mangadex.org/follows*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let rows = document.getElementsByClassName('chapter-container')[0].children;
  let arr = Array.from(rows);
  // insert placeholder nodes for names
  insert_placeholder_titles(arr);

  let headerEye = rows[0].querySelector('span[title="Read"]');
  headerEye.onclick = hideSeen;
  // cursor: pointer for elem
  headerEye.style.cursor = 'pointer';

  function hideSeen() {
    // hide seen chapters
    arr.filter(elem => elem.querySelector('.fas.fa-eye.fa-fw'))
       .slice(1) // ignore header
       .forEach(elem => elem.hidden = true);

    // if current node has no title, and previous node not around,
    // set
    let unseen = arr.filter(elem => elem.querySelector('.fas.fa-eye-slash.fa-fw'))
                    .map(elem => elem.firstElementChild.firstElementChild);
    if (unseen.length > 0) {
      // ensure first row always has a title
      let prev = unseen[0].title;
      unseen[0].innerText = prev;

      for (let i = 1; i < unseen.length; i++) {
        if (unseen[i].innerText === '' && prev !== unseen[i].title) {
          prev = unseen[i].title;
          unseen[i].innerText = prev;
        } else {
          prev = unseen[i].title;
        }
      }
    }

    // attach reset to header
    headerEye.onclick = reset;
  }

  function reset() {
    arr.forEach(elem => elem.hidden = false);

    // go through all nodes and if previous node has same title, clear title
    let temp = arr.map(elem => elem.firstElementChild.firstElementChild);
    let prev = temp[0].title;

    for (let i = 1; i < temp.length; i++) {
      if (prev === temp[i].title) {
        temp[i].innerText = '';
      } else {
        prev = temp[i].title;
      }
    }

    // attach hideSeen
    headerEye.onclick = hideSeen;
  }

  function insert_placeholder_titles(arr) {
    let prev;
    let inner_nodes = arr.map(x => x.children[0]);
    for (let i = 1; i < inner_nodes.length; i++) {
      if (inner_nodes[i].children.length == 0) {
        // duplicate previous node here but keep title empty
        // previous node only contains link and title
        inner_nodes[i].appendChild(prev.cloneNode());
      } else {
        prev = inner_nodes[i].firstElementChild;
      }
    }
  }
})();

