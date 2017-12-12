import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Carrier } from './carrier.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CarrierService {

    private resourceUrl = SERVER_API_URL + 'api/carriers';

    constructor(private http: Http) { }

    create(carrier: Carrier): Observable<Carrier> {
        const copy = this.convert(carrier);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(carrier: Carrier): Observable<Carrier> {
        const copy = this.convert(carrier);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Carrier> {
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
     * Convert a returned JSON object to Carrier.
     */
    private convertItemFromServer(json: any): Carrier {
        const entity: Carrier = Object.assign(new Carrier(), json);
        return entity;
    }

    /**
     * Convert a Carrier to a JSON which can be sent to the server.
     */
    private convert(carrier: Carrier): Carrier {
        const copy: Carrier = Object.assign({}, carrier);
        return copy;
    }
}
