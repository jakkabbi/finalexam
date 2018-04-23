import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Share } from '../shared/models/share';

@Injectable()
export class ShareService {

  constructor(private http: HttpClient) { }

  getShares(user: String): Observable<Share[]> {
    return this.http.get<Share[]>(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/shares/${user}`);
  }

  countShares(): Observable<number> {
    return this.http.get<number>('http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/shares/count');
  }

  addShare(share: Share): Observable<Share> {
    return this.http.post<Share>('http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/share', share);
  }

  getShare(share: Share): Observable<Share> {
    return this.http.get<Share>(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/share/${share._id}`);
  }

  getPrice(share: Share): Observable<number> {
    return this.http.get<number>(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/price/${share.tickerName}`);
  }

  editShare(share: Share): Observable<string> {
    return this.http.put(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/share/${share._id}`, share, { responseType: 'text' });
  }

  deleteShare(share: Share): Observable<string> {
    return this.http.delete(`http://ec2-52-15-39-153.us-east-2.compute.amazonaws.com:3000/api/share/${share._id}`, { responseType: 'text' });
  }

}
