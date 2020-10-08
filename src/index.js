import "bootstrap";
import $ from "jquery";
import { artists, albums } from "./scripts/database";

// Load images (artists & albums)
const artistImages = require("./assets/artists/*.jpg");
const albumsImages = require("./assets/albums/*.jpg");

// JQuery
$(document).ready(() => {
  // Append Artists items to artists tab
  renderItems("#artists .tab-pane__content", "artists");
  // Append Albums items to albums tab
  renderItems("#albums .tab-pane__content", "albums");
  importImages();
});

const importImages = () => {};

const renderItems = (target, action) => {
  let arrayToLoop = albums;;
  if (action === "artists"){
    arrayToLoop = artists;
  }
  
  arrayToLoop.map((item) => {
    let newItem = "<!-- Media Item - Start -->";
    // Add media-item (artist or album)
    if (action === "artists") {
      newItem += '<div class="media-item media-item__artist">';
    } else {
      newItem += '<div class="media-item">';
    }
    // Open item__media
    newItem += '<div class="item__media">';
    // Add Image
    newItem += '<img class="item__media__image"' 
    if (action === "artists") {
        newItem += 'src="' + artistImages[item.name] + '" ';
      } else {
        newItem += 'src="' + albumsImages[item.name] + '" ';
      }
    newItem += 'alt="' + item.image + '" />';
    // Close item__media
    newItem += "</div>";
    // Open item-description
    newItem += '<div class="item-description">';
    // item-description__header
    newItem +=
      '<div class="item-description__header">' +
      formatToPascalCase(item.name) +
      "</div>";
    // item-description__text
    newItem +=
      '<div class="item-description__text">' + getRandomFans() + " fans</div>";
    // Close item-description
    newItem += "</div>";
    // Close media-item
    newItem += "</div>";
    // Add Ending Comment
    newItem += "<!-- Media Item - End -->";
    // Append new item into target
    $(target).append(newItem);
  });
};

const getRandomFans = () => {
  // Generate Random Number
  let randomNumber = Math.floor(Math.random() * 2000000) + 1;
  // Insert dots to thousands and return
  return randomNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatToPascalCase = (text) => {
  // Replace "-" to " "
  text = text.replace(/-/g, " ");
  // Text to Pascal Case
  text = text.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
  // Return parsed Text
  return text;
};
