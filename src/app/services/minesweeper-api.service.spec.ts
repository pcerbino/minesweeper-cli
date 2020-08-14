import { TestBed } from '@angular/core/testing';

import { MinesweeperApiService } from './minesweeper-api.service';

describe('MinesweeperApiService', () => {
  let service: MinesweeperApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinesweeperApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
