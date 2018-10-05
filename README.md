# Notifications API test

You can use the web-push service (each browser has his own notification service), or implement your own notifications service connecting with front-end.

There are two types of notifications:
- Default classic style notification (Chrome built in notification)
- Windows (or other OS) native notification (Windows Action Center)

https://www.askvg.com/tip-enable-disable-google-chrome-notifications-to-show-in-windows-10-action-center/


## Front-end
Service workers don't work with ng serve
- ng build --prod
- http-server -p 8080 -c-1 dist/push-notifications/

## Back-end
- node server.js
- Postman -> POST localhost:9000/api/newsletter
