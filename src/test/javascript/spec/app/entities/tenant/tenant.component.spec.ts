/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { TenantComponent } from '../../../../../../main/webapp/app/entities/tenant/tenant.component';
import { TenantService } from '../../../../../../main/webapp/app/entities/tenant/tenant.service';
import { Tenant } from '../../../../../../main/webapp/app/entities/tenant/tenant.model';

describe('Component Tests', () => {

    describe('Tenant Management Component', () => {
        let comp: TenantComponent;
        let fixture: ComponentFixture<TenantComponent>;
        let service: TenantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [TenantComponent],
                providers: [
                    TenantService
                ]
            })
            .overrideTemplate(TenantComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TenantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TenantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Tenant(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tenants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
