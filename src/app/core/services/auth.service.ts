import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = environment.baseUrl;
    private user?: User;

    constructor(private httpClient: HttpClient) {
        this.loadUserFromLocalStorage();
    }

    get currentUser(): User | undefined {
        if (!this.user) return undefined;

        return this.user;
    }

    login(username: string, password: string): Observable<User | null> {
        return this.httpClient.post<User>(`${this.baseUrl}auth/login`, { username, password })
            .pipe(
                tap(user => {
                    this.user = user;
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('user', JSON.stringify(user)); 
                }),
                catchError(error => {
                    if (error.status === 401) {
                        return of(null);
                    } else {
                        throw error;
                    }
                })
            );
    }

    register(user: User): Observable<User> {
        user.role = 'student';
        return this.httpClient.post<User>(`${this.baseUrl}/users`, user);
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }

    isAdmin(): boolean {
        return this.user?.role === 'admin';
    }

    private loadUserFromLocalStorage(): void {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }
    }
}