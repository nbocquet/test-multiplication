import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableMultiplicationComponent } from './test.component';

describe('TableMultiplicationComponent', () => {
  let component: TableMultiplicationComponent;
  let fixture: ComponentFixture<TableMultiplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMultiplicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableMultiplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
