import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MinesweeperApiService {

	url = 'http://127.0.0.1:8000/api';

	constructor(private http: HttpClient) { }

	startGame() {
		return this.http.post(`${this.url}/game`, null);
	}

	putFlag(gameId, x, y) {
		return this.http.put(`${this.url}/game/${gameId}/setFlag`, {x:x, y:y});
	}

	displaySquare(gameId, x,y) {
		return this.http.put(`${this.url}/game/${gameId}/setSquare`, {x:x, y:y});
	}
}
