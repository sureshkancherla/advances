import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Enrollment_Commission } from './enrollment-commission.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Enrollment_CommissionService {

    private resourceUrl = SERVER_API_URL + 'api/enrollment-commissions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(enrollment_Commission: Enrollment_Commission): Observable<Enrollment_Commission> {
        const copy = this.convert(enrollment_Commission);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(enrollment_Commission: Enrollment_Commission): Observable<Enrollment_Commission> {
        const copy = this.convert(enrollment_Commission);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Enrollment_Commission> {
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
     * Convert a returned JSON object to Enrollment_Commission.
     */
    private convertItemFromServer(json: any): Enrollment_Commission {
        const entity: Enrollment_Commission = Object.assign(new Enrollment_Commission(), json);
        entity.statementDate = this.dateUtils
            .convertDateTimeFromServer(json.statementDate);
        return entity;
    }

    /**
     * Convert a Enrollment_Commission to a JSON which can be sent to the server.
     */
    private convert(enrollment_Commission: Enrollment_Commission): Enrollment_Commission {
        const copy: Enrollment_Commission = Object.assign({}, enrollment_Commission);

        copy.statementDate = this.dateUtils.toDate(enrollment_Commission.statementDate);
        return copy;
    }
}
