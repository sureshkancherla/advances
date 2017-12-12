/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { LookupDialogComponent } from '../../../../../../main/webapp/app/entities/lookup/lookup-dialog.component';
import { LookupService } from '../../../../../../main/webapp/app/entities/lookup/lookup.service';
import { Lookup } from '../../../../../../main/webapp/app/entities/lookup/lookup.model';
import { AgentPayoutService } from '../../../../../../main/webapp/app/entities/agent-payout';

describe('Component Tests', () => {

    describe('Lookup Management Dialog Component', () => {
        let comp: LookupDialogComponent;
        let fixture: ComponentFixture<LookupDialogComponent>;
        let service: LookupService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [LookupDialogComponent],
                providers: [
                    AgentPayoutService,
                    LookupService
                ]
            })
            .overrideTemplate(LookupDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LookupDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LookupService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Lookup(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.lookup = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lookupListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Lookup();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.lookup = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lookupListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
