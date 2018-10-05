import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub) {
    console.log(sub);

    return this.http.post('http://localhost:9000/api/subscribe', sub);
  }
}
