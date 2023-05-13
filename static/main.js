"use strict";

/*
  Copyright (c) 2023 Ryan Fleck
  License provided in LICENSE.txt
*/

console.log("main.js loaded");

// Global Variables
var serviceWorkerRegistration;
// PublicKey available in this file via the flask template. See index.html

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

  if (Notification.permission !== "granted") {
    console.log("Requesting permission...");
    Notification.requestPermission()
      .then(function (permission) {
        switch (permission) {
          case "granted":
            console.log("Notifications enabled.");
            sendTestNotification();
            break;

          default:
            console.log("Permission not granted, set to: " + permission);
            warningNotificationsDisabled.style.display = "block";
        }
      })
      .catch(function () {
        console.log("Failed to enable notifications.");
      });
  } else {
    console.log("Notifications permission is already granted.");
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Registering service worker...");
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (reg) {
        serviceWorkerRegistration = reg;
        console.log("Service worker registered: ", reg);
      });
  } else {
    console.error(
      "ServiceWorker or PushManager unavailable, failed to register ServiceWorker."
    );
  }
}

function sendTestNotification() {
  console.log("Sending a test notification...");
  var notification = new Notification("Pager", {
    body: "Buzz buzz! Notification test.",
  });
  notification.addEventListener("show", function () {
    console.log("Notification shown.");
  });
}

// Setup

function setup() {
  // Check if notifications are supported, quit early otherwise

  if (!checkNotificationsAvailable()) return;
  enableNotifications();
  registerServiceWorker();
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
    window.onload = new_onload;
  } else {
    window.onload = setup;
  }
}

/** HELPER FUNCTIONS FROM GOOGLE CODELAB */

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
