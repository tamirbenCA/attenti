import gameService from '../services/gameService.js';
import myHeader from './header.js';

export default {
	template: `
		<section class="main-board">
			<my-header @set-size="setSize" />
			<div class="canvas-container" v-if="board">
				<canvas ref="myCanvas" />
			</div>
			<h4 v-if="count">Counted islands: {{count}}</h4>
		</section>
	`,
	data() {
		return {
			board: null,
			count: null,
		}
	},
	methods: {
		setSize({ width, height }) {
			const data = gameService.initBoard(height, width);
			this.board = data.board;
			this.count = data.count;
			this.drawCanvas();
		},
		drawCanvas() {
			const canvas = this.$refs.myCanvas;
			canvas.width = this.board[0].length;
			canvas.height = this.board.length;
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, this.board[0].length, this.board.length);
			for (let i = 0; i < this.board.length; ++i) {
				for (var j = 0; j < this.board[0].length; ++j) {
					if (this.board[i][j]) {
						ctx.fillStyle = this.getIslandColor(this.board[i][j]);
						ctx.fillRect(i, j, 1, 1);
					}
				}
			}
		},
		// get color by value with caching via closure.
		getIslandColor: (function () {
			const colorsMap = {};
			return num => {
				colorsMap[num] = colorsMap[num] || gameService.getRandColor()
				return colorsMap[num];
			}
		})(),
	},
	components: {
		myHeader
	},
}
