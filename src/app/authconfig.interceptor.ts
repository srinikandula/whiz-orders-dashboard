import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem('access_token');
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken,
                // Cookie: "token=" + authToken
            }
        });
        return next.handle(req);
    }
}