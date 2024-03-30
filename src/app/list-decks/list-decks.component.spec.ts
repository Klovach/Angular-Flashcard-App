import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDecksComponent } from './list-decks.component';

describe('ListDecksComponent', () => {
  let component: ListDecksComponent;
  let fixture: ComponentFixture<ListDecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDecksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
