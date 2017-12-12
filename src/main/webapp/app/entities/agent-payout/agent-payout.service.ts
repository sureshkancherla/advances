import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Agent_Payout } from './agent-payout.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Agent_PayoutService {

    private resourceUrl = SERVER_API_URL + 'api/agent-payouts';

    constructor(private http: Http) { }

    create(agent_Payout: Agent_Payout): Observable<Agent_Payout> {
        const copy = this.convert(agent_Payout);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(agent_Payout: Agent_Payout): Observable<Agent_Payout> {
        const copy = this.convert(agent_Payout);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Agent_Payout> {
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
     * Convert a returned JSON object to Agent_Payout.
     */
    private convertItemFromServer(json: any): Agent_Payout {
        const entity: Agent_Payout = Object.assign(new Agent_Payout(), json);
        return entity;
    }

    /**
     * Convert a Agent_Payout to a JSON which can be sent to the server.
     */
    private convert(agent_Payout: Agent_Payout): Agent_Payout {
        const copy: Agent_Payout = Object.assign({}, agent_Payout);
        return copy;
    }
}
