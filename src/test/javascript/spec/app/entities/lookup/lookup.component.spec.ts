/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { LookupComponent } from '../../../../../../main/webapp/app/entities/lookup/lookup.component';
import { LookupService } from '../../../../../../main/webapp/app/entities/lookup/lookup.service';
import { Lookup } from '../../../../../../main/webapp/app/entities/lookup/lookup.model';

describe('Component Tests', () => {

    describe('Lookup Management Component', () => {
        let comp: LookupComponent;
        let fixture: ComponentFixture<LookupComponent>;
        let service: LookupService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [LookupComponent],
                providers: [
                    LookupService
                ]
            })
            .overrideTemplate(LookupComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LookupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LookupService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Lookup(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lookups[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
