import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Share } from '../shared/models/share';

@Injectable()
export class ShareService {

  constructor(private http: HttpClient) { }

  getShares(user: String): Observable<Share[]> {
    return this.http.get<Share[]>(`/api/shares/${user}`);
  }

  countShares(): Observable<number> {
    return this.http.get<number>('/api/shares/count');
  }

  addShare(share: Share): Observable<Share> {
    return this.http.post<Share>('/api/share', share);
  }

  getShare(share: Share): Observable<Share> {
    return this.http.get<Share>(`/api/share/${share._id}`);
  }

  getPrice(share: Share): Observable<number> {
    return this.http.get<number>(`/api/price/${share.tickerName}`);
  }

  editShare(share: Share): Observable<string> {
    return this.http.put(`/api/share/${share._id}`, share, { responseType: 'text' });
  }

  deleteShare(share: Share): Observable<string> {
    return this.http.delete(`/api/share/${share._id}`, { responseType: 'text' });
  }

}
