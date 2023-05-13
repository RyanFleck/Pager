# Pager

A small prototype to pioneer the use of web-push notifications to iOS and Android devices in my hacker clan.

Apple first announced web-push support for Safari in June 2022[^1], but only added iOS support in March of 2023[^2]. Apple published 
[documentation](https://developer.apple.com/documentation/usernotifications/sending_web_push_notifications_in_web_apps_safari_and_other_browsers)
on the matter which conforms to web standards[^3].

> You don’t need to join the Apple Developer Program to send web push notifications.

To learn about web push, you need to understand [service workers.](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Notes

- Registering a [service worker](https://web.dev/service-workers-registration/)
- Microsoft article on [push notifications](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/notifications-badges)
- Article on [push notifications](https://www.educative.io/blog/5-minute-guide-to-push-notifications-in-pwa)
- Service Worker Cookbook entry on [push clients](https://github.com/mdn/serviceworker-cookbook/blob/master/push-clients/)
- Served with NGROK
- Followed [this codelab](https://codelabs.developers.google.com/codelabs/push-notifications#0) tutorial
- Hand drawn favicon :D

### Development

Something like:

```sh
pip install flask
python3 app.py
```

[^1]: ["Meet Web Push"](https://webkit.org/blog/12945/meet-web-push/)

[^2]: [Web Push Announced for iPhone](https://www.computerworld.com/article/3691899/what-is-web-push-for-web-apps-on-iphone-and-ipad.html)

[^3]: [MDN: Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
