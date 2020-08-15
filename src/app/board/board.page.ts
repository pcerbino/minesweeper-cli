import { Component, OnInit } from '@angular/core';
import { MinesweeperApiService } from '../services/minesweeper-api.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-board',
	templateUrl: './board.page.html',
	styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

	board: object = null;
	happyFace: string = 'assets/facesmile.gif';
	clickCount: number = 0;
	gameId: string = null;

	constructor(private minesweeperApiService: MinesweeperApiService, private menu: MenuController, private authService: AuthService) { 
		this.menu.enable(true);
	}

	ngOnInit() {
		this.startGame();
	}

	startGame() {
		this.minesweeperApiService.startGame().subscribe((results:any) => {
			this.board = results.board;
			this.gameId = results.gameId;
		});
	}

	flag(x, y){

		console.log(this.board)
		
		this.minesweeperApiService.putFlag(this.gameId, x,y).subscribe((results:any) => {
			console.log(this.board)
			this.board = results.board;
		});

		return false;
	}

	display(x, y) {
		this.minesweeperApiService.displaySquare(this.gameId, x,y).subscribe((results:any) => {
			this.board = results.board;			
		});
	}

	ohh(){
		
		this.happyFace = 'assets/faceooh.gif';
		setTimeout(() => { 
            this.happyFace = 'assets/facesmile.gif';
        }, 200 );
		
	}
}
