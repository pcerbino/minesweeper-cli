import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})

export class MinesweeperApiService {

	constructor(private http: HttpClient, private env: EnvService, private storage: NativeStorage) { }

	startGame(cols, rows, mines) {

		let token = JSON.parse(localStorage.getItem("token"));
		
		token = JSON.parse(token);  

		let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token.token});

		return this.http.post(this.env.API_URL + 'game', {rows: rows, cols:cols, mines: mines}, { headers: headers });
	}

	putFlag(gameId, x, y) {

		let token = JSON.parse(localStorage.getItem("token"));
		
		token = JSON.parse(token)

		let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token.token});

		return this.http.put(this.env.API_URL + 'game/'+gameId+'/setFlag', {x:x, y:y}, { headers: headers });
	}

	displaySquare(gameId, x,y) {

		let token = JSON.parse(localStorage.getItem("token"));
		
		token = JSON.parse(token)

		let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token.token});

		return this.http.put(this.env.API_URL + 'game/'+gameId+'/setSquare', {x:x, y:y}, { headers: headers });
	}
}
