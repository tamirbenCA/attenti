import gameService from '../services/gameService.js';
import myHeader from './header.js';

export default {
	template: `
		<section class="main-board">
			<my-header @set-size="setSize" />
			<div class="canvas-container">
				<canvas ref="myCanvas" />
			</div>
			<h4 v-if="count">Counted islands: {{count}}</h4>
		</section>
	`,
	data() {
		return {
			table: null,
			count: null,
		}
	},
	methods: {
		setSize({ width, height }) {
			const data = gameService.initBoard(height, width);
			this.table = data.board;
			this.count = data.count;
			this.drawCanvas();
		},
		drawCanvas() {
			const canvas = this.$refs.myCanvas;
			canvas.width = this.table[0].length;
			canvas.height = this.table.length;
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, this.table[0].length, this.table.length);
			for (let i = 0; i < this.table.length; ++i) {
				for (var j = 0; j < this.table[0].length; ++j) {
					if (this.table[i][j]) {
						ctx.fillStyle = this.getIslandColor(this.table[i][j]);
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
