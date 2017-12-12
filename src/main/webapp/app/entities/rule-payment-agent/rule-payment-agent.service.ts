import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Rule_Payment_Agent } from './rule-payment-agent.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Rule_Payment_AgentService {

    private resourceUrl = SERVER_API_URL + 'api/rule-payment-agents';

    constructor(private http: Http) { }

    create(rule_Payment_Agent: Rule_Payment_Agent): Observable<Rule_Payment_Agent> {
        const copy = this.convert(rule_Payment_Agent);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rule_Payment_Agent: Rule_Payment_Agent): Observable<Rule_Payment_Agent> {
        const copy = this.convert(rule_Payment_Agent);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Rule_Payment_Agent> {
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
     * Convert a returned JSON object to Rule_Payment_Agent.
     */
    private convertItemFromServer(json: any): Rule_Payment_Agent {
        const entity: Rule_Payment_Agent = Object.assign(new Rule_Payment_Agent(), json);
        return entity;
    }

    /**
     * Convert a Rule_Payment_Agent to a JSON which can be sent to the server.
     */
    private convert(rule_Payment_Agent: Rule_Payment_Agent): Rule_Payment_Agent {
        const copy: Rule_Payment_Agent = Object.assign({}, rule_Payment_Agent);
        return copy;
    }
}
