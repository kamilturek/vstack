import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '@environment/environment';
import { Instance, NewInstance } from '@app/modules/instances/interfaces/instance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor(private http: HttpClient) { }

  getInstances(): Observable<Instance[]> {
    return this.http.get<Instance[]>(`${baseUrl}/api/instances/`);
  }

  create(newInstance: NewInstance): Observable<Instance> {
    return this.http.post<Instance>(`${baseUrl}/api/instances/`, newInstance);
  }

  delete(instance: Instance): Observable<{}> {
    return this.http.delete<{}>(`${baseUrl}/api/instances/${instance.id}/`);
  }
}
