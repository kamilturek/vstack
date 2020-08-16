import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '@environment/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Credentials } from '../interfaces/credentials';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${baseUrl}/api/users/current/`);
    }

    register(credentials: Credentials): Observable<Credentials> {
        return this.http.post<Credentials>(`${baseUrl}/api/users/`, credentials);
    }

    setPassword(userId: number,
                data: {
                    currentPassword: string,
                    password: string,
                    passwordConfirmation: string,
    }): Observable<string> {
        return this.http.post<string>(`${baseUrl}/api/users/${userId}/set_password/`, {
            current_password: data.currentPassword,
            password: data.password,
            password_confirmation: data.passwordConfirmation
        });
    }
}
