import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Enrollment } from './enrollment.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EnrollmentService {

    private resourceUrl = SERVER_API_URL + 'api/enrollments';

    constructor(private http: Http) { }

    create(enrollment: Enrollment): Observable<Enrollment> {
        const copy = this.convert(enrollment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(enrollment: Enrollment): Observable<Enrollment> {
        const copy = this.convert(enrollment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Enrollment> {
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
     * Convert a returned JSON object to Enrollment.
     */
    private convertItemFromServer(json: any): Enrollment {
        const entity: Enrollment = Object.assign(new Enrollment(), json);
        return entity;
    }

    /**
     * Convert a Enrollment to a JSON which can be sent to the server.
     */
    private convert(enrollment: Enrollment): Enrollment {
        const copy: Enrollment = Object.assign({}, enrollment);
        return copy;
    }
}
