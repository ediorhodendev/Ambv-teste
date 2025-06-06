import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCreateComponent } from './sale-create.component';

describe('SaleCreateComponent', () => {
  let component: SaleCreateComponent;
  let fixture: ComponentFixture<SaleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
