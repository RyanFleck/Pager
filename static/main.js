console.log("main.js loaded");

// Functions

function checkNotificationsAvailable() {
  if ("Notification" in window) {
    console.log("The Notifications API is supported");
    return true;
  } else {
    console.log("Failure: Notification system not available.");
    return false;
  }
}

function enableNotifications() {
  var warningNotificationsDisabled = document.getElementById(
    "notificationsDisabled"
  );

  return Notification.requestPermission()
    .then(function (permission) {
      switch (permission) {
        case "granted":
          console.log("Notifications enabled.");
          break;

        default:
          console.log("Permission not granted, set to: " + permission);
          warningNotificationsDisabled.style.display = "block";
      }
    })
    .catch(function () {
      console.log("Failed to enable notifications.");
    });
}

function loadServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/static/service-worker.js");
    });
  }
}

// Setup

function setup() {
  // Check if notifications are supported, quit early otherwise

  if (!checkNotificationsAvailable()) return;
  enableNotifications();
  loadServiceWorker();
}

// Run 'setup' function on load.
// https://stackoverflow.com/a/807997
if (window.attachEvent) {
  window.attachEvent("onload", setup);
} else {
  if (window.onload) {
    var current_onload = window.onload;
    var new_onload = function (evt) {
      current_onload(evt);
      setup();
    };
    window.onload = newonload;
  } else {
    window.onload = setup;
  }
}
