import gameService from '../services/gameService.js';
import myHeader from './header.js';

export default {
	template: `
		<section class="main-board">
			<my-header @set-size="setSize" />
			<table id="island-table" v-if="table">
				<tr v-for="(row, i) in table">
					<td v-for="(value, j) in row"
						:class="setClassName(i, j)"
						:style="{
							backgroundColor: value ? getIslandColor(value) : '#ffffff',
						}"
					>
					</td>
				</tr>
			</table>
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
		setClassName(i, j) {
			return `pixel-${i}-${j}`;
		},
		setSize({width, height}) {
			const data = gameService.initBoard(height, width);
			this.table = data.board;
			this.count = data.count;
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
