/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_Payment_MetaDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data-delete-dialog.component';
import { Enrollment_Payment_MetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.service';

describe('Component Tests', () => {

    describe('Enrollment_Payment_MetaData Management Delete Component', () => {
        let comp: Enrollment_Payment_MetaDataDeleteDialogComponent;
        let fixture: ComponentFixture<Enrollment_Payment_MetaDataDeleteDialogComponent>;
        let service: Enrollment_Payment_MetaDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_Payment_MetaDataDeleteDialogComponent],
                providers: [
                    Enrollment_Payment_MetaDataService
                ]
            })
            .overrideTemplate(Enrollment_Payment_MetaDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_Payment_MetaDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_Payment_MetaDataService);
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
