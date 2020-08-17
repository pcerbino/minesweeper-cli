import { Component, OnInit } from '@angular/core';
import { MinesweeperApiService } from '../services/minesweeper-api.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';


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
	user: User;
	played: number = 0;
	winned: number = 0;
	loosed: number = 0;
	abandoned: number = 0;
	inProgress: number = 0;
	level: number = 2;

	constructor(private minesweeperApiService: MinesweeperApiService, private menu: MenuController, private authService: AuthService) { 
		this.menu.enable(true);
	}

	ngOnInit() {
		this.startGame();
	}

	startGame() {
		
		this.happyFace = 'assets/facesmile.gif';

		let cols = 20;
		let rows = 10;
		let mines = 20;

		if(this.level == 1){
			cols = 10;
			rows = 10;
			mines = 10;
		}
		else if(this.level == 2){
			cols = 20;
			rows = 20;
			mines = 55;
		}
		else if(this.level == 3){
			cols = 20;
			rows = 35;
			mines = 90;
		}

		console.log("start game in level " + this.level);

		this.minesweeperApiService.startGame(cols, rows, mines).subscribe((results:any) => {
			this.userRefresh();
			this.board = results.board;
			this.gameId = results.gameId;
		});
	}

	changeLevel(){
		this.startGame();
	}

	flag(x, y){
		
		this.minesweeperApiService.putFlag(this.gameId, x,y).subscribe((results:any) => {
			this.userRefresh();
			//this.board = results.board;
			this.renderSquares(results);
		});
		return false;
	}

	ionViewWillEnter() {
		this.userRefresh();
	}

	renderSquares(arr){

		arr.affectedSquares.forEach(square => {
			
			let affectedSquare  =  document.querySelector("#sq_"+square.x+"x"+square.y);
			let imgSrc = "assets/blank.gif"
			let contextmenu = null;
			let click = "ohh()";
			
			if (square.status.value == 'flag'){

				imgSrc = "assets/bombflagged.gif";
				contextmenu = "flag("+square.x+", "+square.y+")";

			}else if (square.status.value == 'hidden'){

				imgSrc = "assets/blank.gif";

			}else if (square.content.value == 'mine'){

				imgSrc = "assets/bombrevealed.gif";

			}else if (square.content.value == 'number'){

				imgSrc = "assets/open"+square.number+".gif";

			}else if (square.content.value == 'death'){
				imgSrc = "assets/bombdeath.gif";
			
			}else if (square.content.value == 'empty'){
				imgSrc = "assets/open0.gif";
			}
			
			affectedSquare.setAttribute("src", imgSrc);
			affectedSquare.setAttribute("contextmenu", contextmenu);

		});	

	}

	display(x, y) {
		this.minesweeperApiService.displaySquare(this.gameId, x,y).subscribe((results:any) => {
			
			//this.board = results.board;
			
			this.renderSquares(results);

			if(results.status == 'loosed'){
				this.userRefresh();
				this.happyFace = 'assets/facedead.gif';
			}

			if(results.status == 'winned'){
				this.userRefresh();
				this.happyFace = 'assets/facewin.gif';
			}
 
		});
	}

	ohh(){
		this.happyFace = 'assets/faceooh.gif';
		setTimeout(() => { 
            this.happyFace = 'assets/facesmile.gif';
        }, 200 );
		
	}

	userRefresh(){
		this.authService.user().subscribe((user:any) => {
			this.user = user.user;
			this.winned = user.stats.winned;
			this.loosed = user.stats.loosed;
			this.abandoned = user.stats.abandoned;
			this.played = user.stats.played;
			this.inProgress = user.stats.inProgress;
		});
	}
}
