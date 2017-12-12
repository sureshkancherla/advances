import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Enrollment_Payment_MetaData } from './enrollment-payment-meta-data.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Enrollment_Payment_MetaDataService {

    private resourceUrl = SERVER_API_URL + 'api/enrollment-payment-meta-data';

    constructor(private http: Http) { }

    create(enrollment_Payment_MetaData: Enrollment_Payment_MetaData): Observable<Enrollment_Payment_MetaData> {
        const copy = this.convert(enrollment_Payment_MetaData);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(enrollment_Payment_MetaData: Enrollment_Payment_MetaData): Observable<Enrollment_Payment_MetaData> {
        const copy = this.convert(enrollment_Payment_MetaData);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Enrollment_Payment_MetaData> {
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
     * Convert a returned JSON object to Enrollment_Payment_MetaData.
     */
    private convertItemFromServer(json: any): Enrollment_Payment_MetaData {
        const entity: Enrollment_Payment_MetaData = Object.assign(new Enrollment_Payment_MetaData(), json);
        return entity;
    }

    /**
     * Convert a Enrollment_Payment_MetaData to a JSON which can be sent to the server.
     */
    private convert(enrollment_Payment_MetaData: Enrollment_Payment_MetaData): Enrollment_Payment_MetaData {
        const copy: Enrollment_Payment_MetaData = Object.assign({}, enrollment_Payment_MetaData);
        return copy;
    }
}
