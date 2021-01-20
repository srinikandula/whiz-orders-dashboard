import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const url = window.location.hostname;
        localStorage.setItem('host',url);
        const authToken = localStorage.getItem('access_token');
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken,
                // Cookie: "token=" + authToken
                // clientCode: url
            }
        });
        return next.handle(req);
    }
}