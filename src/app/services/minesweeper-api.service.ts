import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})

export class MinesweeperApiService {

	constructor(private http: HttpClient, private env: EnvService, private storage: NativeStorage) { }

	startGame() {

		let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) });

		return this.http.post(this.env.API_URL + 'game', {rows: 10, cols:20, mines: 10}, { headers: headers });
	}

	putFlag(gameId, x, y) {

		let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token") });

		return this.http.put(this.env.API_URL + 'game/${gameId}/setFlag', {x:x, y:y}, { headers: headers });
	}

	displaySquare(gameId, x,y) {

		let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token") });

		return this.http.put(this.env.API_URL + 'game/${gameId}/setSquare', {x:x, y:y}, { headers: headers });
	}
}
