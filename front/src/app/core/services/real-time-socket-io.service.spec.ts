import { TestBed } from '@angular/core/testing';

import { RealTimeSocketIoService } from './real-time-socket-io.service';

describe('RealTimeSocketIoService', () => {
  let service: RealTimeSocketIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeSocketIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
