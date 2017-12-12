import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Tenant } from './tenant.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TenantService {

    private resourceUrl = SERVER_API_URL + 'api/tenants';

    constructor(private http: Http) { }

    create(tenant: Tenant): Observable<Tenant> {
        const copy = this.convert(tenant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tenant: Tenant): Observable<Tenant> {
        const copy = this.convert(tenant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tenant> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Tenant.
     */
    private convertItemFromServer(json: any): Tenant {
        const entity: Tenant = Object.assign(new Tenant(), json);
        return entity;
    }

    /**
     * Convert a Tenant to a JSON which can be sent to the server.
     */
    private convert(tenant: Tenant): Tenant {
        const copy: Tenant = Object.assign({}, tenant);
        return copy;
    }
}
