/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_CommissionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission-delete-dialog.component';
import { Enrollment_CommissionService } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.service';

describe('Component Tests', () => {

    describe('Enrollment_Commission Management Delete Component', () => {
        let comp: Enrollment_CommissionDeleteDialogComponent;
        let fixture: ComponentFixture<Enrollment_CommissionDeleteDialogComponent>;
        let service: Enrollment_CommissionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_CommissionDeleteDialogComponent],
                providers: [
                    Enrollment_CommissionService
                ]
            })
            .overrideTemplate(Enrollment_CommissionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_CommissionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_CommissionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
