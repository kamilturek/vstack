import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from '@app/modules/images/interfaces/image';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '@environment/environment';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(private http: HttpClient) { }

    getImages(): Observable<Image[]> {
        return this.http.get<Image[]>(`${baseUrl}/api/instances/images/`);
    }
}
