import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class FootballDataInterceptor implements HttpInterceptor {
    apiKey: string = environment.apiKey; 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            headers: req.headers.set('X-Auth-Token', this.apiKey),
            params: req.params.set('responseType', 'json')
        })
        return next.handle(clonedRequest);
    }
}