import { from, Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  onSearchReview: EventEmitter<any> = new EventEmitter();

  onlyID = null;
  mode = '';
  searchKeyword = '';
  idOfReview = null;
  idOfCmt = null;

  constructor(
    private httpClient: HttpClient,
    ) { }

  // tslint:disable-next-line: typedef
  getContact_khoa() {
    return this.httpClient.get('https://reviewiuh-api.azurewebsites.net/api/Topic/type?type=5');
  }

  // tslint:disable-next-line: typedef
  getContact_mon() {
    return this.httpClient.get('https://reviewiuh-api.azurewebsites.net/api/Topic/type?type=10');
  }

  // tslint:disable-next-line: typedef
  getContact_reviewNew() {
    return this.httpClient.get('https://reviewiuh-api.azurewebsites.net/api/Review/ReviewNearest');
  }

  // tslint:disable-next-line: typedef
  getContact_review() {
    return this.httpClient.get('https://reviewiuh-api.azurewebsites.net/api/Review');
  }

  // tslint:disable-next-line: typedef
  getContact_reviewHot() {
    return this.httpClient.get('https://reviewiuh-api.azurewebsites.net/api/Review/HighLight');
  }

  // tslint:disable-next-line: typedef
  getContact_comment() {
    return this.httpClient.get('https://reviewiuh-api.azurewebsites.net/api/Comment/GetListCommentNearest');
  }

  // tslint:disable-next-line: typedef
  updateLike(contactID){
    const endpointURL = 'https://reviewiuh-api.azurewebsites.net/api/Review/Like';
    const params = new HttpParams().set('id', `${contactID}`); // vieets string co gia tri la contactID
    return this.httpClient.put(endpointURL, {}, {params});
  }

  // tslint:disable-next-line: typedef
  updateDisLike(contactID){
    const endpointURL = 'https://reviewiuh-api.azurewebsites.net/api/Review/DisLike';
    const params = new HttpParams().set('id', `${contactID}`); // vieets string co gia tri la contactID
    return this.httpClient.put(endpointURL, {}, {params}); // id là param của database, contactID là giá trị mình truyền vào
  }

  // tslint:disable-next-line: typedef
  createReview(paramSend){
    const endpointURL = 'https://reviewiuh-api.azurewebsites.net/api/Review';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(endpointURL, paramSend, {
      headers
    });
  }
  // tslint:disable-next-line: typedef
  createComment(paramSend){
    const endpointURL = ' /api/Comment';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(endpointURL, paramSend, {
      headers
    });
  }

  // tslint:disable-next-line: typedef
  createRequest(paramSend): Observable<any> {
    const endpointURL = 'https://reviewiuh-api.azurewebsites.net/api/Email';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();

    let path = endpointURL + '?';

    Object.keys(paramSend).forEach(key => {
      formData.append(key, paramSend[key]);
      path = key + '=' + paramSend[key] + '&';
    });
    console.log(path);
    return this.httpClient.post(path, formData, { headers}
  );

  }

  public reqUrl(url: string, params: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions({ headers: headers });

    return this.httpClient.get(url, {
        headers,
        params
    });
  }

}
