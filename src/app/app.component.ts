import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from './newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY = "BAWVTs4OAYC45qIgQcpinDQ_F-f8PE34LgZYVPqMagpB97W-IowR0g4EfiGicPBzkeY_iEMfS3nnxsMdbnz0BS8";

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {
      this.newsletterService.addPushSubscriber(sub).subscribe();
      var notification = new Notification("Hi there!");
      console.log(notification);
      console.log(Notification);


    }).catch(err => console.error("Could not subscribe to notifications", err));
  }
}
