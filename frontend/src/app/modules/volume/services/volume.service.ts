import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '@environment/environment';
import { Observable } from 'rxjs';
import { Volume } from '@app/modules/volume/interfaces/volume';


@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  constructor(private http: HttpClient) { }

  getVolumes(): Observable<Volume[]> {
    return this.http.get<Volume[]>(`${baseUrl}/api/volumes/`);
  }
}
