import "bootstrap";
import $ from "jquery";
import { artists, albums } from "./scripts/database";

// Load images (artists & albums)
const artistImages = require("./assets/artists/*.jpg");
const albumsImages = require("./assets/albums/*.jpg");

// JQuery
$(document).ready(() => {
  // Append Artists items to artists tab
  renderItems("#artists .tab-pane__content", "artists", 100);
  // Append Albums items to albums tab
  renderItems("#albums .tab-pane__content", "albums", 100);
  // Append Songs items to songs tab
  renderSongs("#songs .table-body", 25);
  
  
  // Append Songs items to all tab
  renderSongs("#all .table-body-songs", 6);
  // Append Artists items to all tab
  renderItems("#all .tab-pane__content-artists", "artists", 6);
  // Append Artists items to all tab
  renderItems("#all .tab-pane__content-albums", "albums", 6);
  

  importImages();
});

const importImages = () => {};

const renderItems = (target, action, qty) => {
  let arrayToLoop = albums;
  if (action === "artists") {
    arrayToLoop = artists;
  }

  let counter = 0;
  arrayToLoop.map((item) => {
    if (counter < qty) {
      let newItem = "<!-- Media Item - Start -->";
      // Add media-item (artist or album)
      if (action === "artists") {
        newItem += '<figure class="media-item media-item__artist">';
      } else {
        newItem += '<figure class="media-item">';
      }
      // Open item__media
      newItem += '<div class="item__media">';
      // Add Image
      newItem += '<img class="item__media__image"';
      if (action === "artists") {
        newItem += 'src="' + artistImages[item.name] + '" ';
      } else {
        newItem += 'src="' + albumsImages[item.name] + '" ';
      }
      newItem += 'alt="' + item.image + '" />';
      // Close item__media
      newItem += "</div>";
      // Open item-description
      newItem += '<figcaption class="item-description">';
      // item-description__header
      newItem +=
        '<label class="item-description__header">' +
        formatToPascalCase(item.name) +
        "</label>";
      // item-description__text
      newItem +=
        '<p class="item-description__text">' +
        getRandomFans() +
        " fans</p>";
      // Close item-description
      newItem += "</figcaption>";
      // Close media-item
      newItem += "</figure>";
      // Add Ending Comment
      newItem += "<!-- Media Item - End -->";
      // Append new item into target
      $(target).append(newItem);
    }
    counter++;
  });
};

const renderSongs = (target, qty) => {
  let counter = 0;
  albums.map((item) => {
    if (counter < qty) {
      let newItem = "<!-- Song Item - Start -->";
      // Add media-item (artist or album)
      newItem += "<tr>";
      newItem += '<th scope="row">';
      // Add Image
      newItem += '<img class="song-image"';
      newItem += 'src="' + albumsImages[item.name] + '" ';
      newItem += 'alt="' + item.image + '" />';
      newItem += "</th>";
      newItem += "<td>" + formatToPascalCase(item.name) + "</td>";
      newItem += "<td>The Beatles</td>";
      newItem += "<td>" + formatToPascalCase(item.name) + "</td>";
      newItem += '<td class="duration-cell">' + getRandomDuration() + "</td>";
      newItem += "</tr>";
      $(target).append(newItem);
    }
    counter++;
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

const getRandomDuration = () => {
  // Generate Random Number Seconds
  let randomNumberSeconds = Math.floor(Math.random() * 58) + 10;
  let randomNumberMinutes = Math.floor(Math.random() * 8) + 1;
  return "0" + randomNumberMinutes + ":" + randomNumberSeconds;
};
