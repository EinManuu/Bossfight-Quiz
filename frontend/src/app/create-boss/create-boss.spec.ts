import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoss } from './create-boss';

describe('CreateBoss', () => {
  let component: CreateBoss;
  let fixture: ComponentFixture<CreateBoss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBoss],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBoss);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
