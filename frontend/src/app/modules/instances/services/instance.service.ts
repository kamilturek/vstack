import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  start(instance: Instance): Observable<Instance> {
    return this.http.post<Instance>(`${baseUrl}/api/instances/${instance.id}/start/`, {});
  }

  restart(instance: Instance): Observable<Instance> {
    return this.http.post<Instance>(`${baseUrl}/api/instances/${instance.id}/restart/`, {});
  }

  stop(instance: Instance): Observable<Instance> {
    return this.http.post<Instance>(`${baseUrl}/api/instances/${instance.id}/stop/`, {});
  }

  delete(instance: Instance): Observable<{}> {
    return this.http.delete<{}>(`${baseUrl}/api/instances/${instance.id}/`);
  }

  export(instances: Instance[]): Observable<any> {
    const params = new HttpParams().append(
      'id', instances.map((instance: Instance) => instance.id).join(',')
    );

    return this.http.get(`${baseUrl}/api/instances/export`, {
      responseType: 'blob',
      params
    });
  }
}
