import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '@environment/environment';
import { Instance } from '@app/modules/instances/interfaces/instance';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InstanceService {

    constructor(private http: HttpClient) { }

    getInstances(): Observable<Instance[]> {
        return this.http.get<Instance[]>(`${baseUrl}/api/instances/`);
    }

    delete(instance: Instance): Observable<{}> {
        return this.http.delete<{}>(`${baseUrl}/api/instances/${instance.id}/`);
    }
}
