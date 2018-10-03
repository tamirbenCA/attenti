export default {
	template: `
			<header class="header-bar">
					<img class="logo-img" src="img/logo.jpg" />
					<form id="user-form" @submit.prevent="emitData()">
						<div class="input-user">
							<label>
								Matrix width:
							  <input type="number" v-model="width" placeholder="Width" required></input>
							</label>
						</div>
						<div class="input-user">
						<label>
						  Matrix height:
						  <input type="number" v-model="height" placeholder="Height" required></input>
						</label>
						</div>
						<input type="submit" value="Solve" />
					</form>
			</header>
    `,
	data() {
		return {
			width: null,
			height: null,
		}
	},
	methods: {
		emitData() {
			this.$emit('set-size', {width: this.width, height: this.height});
		}
	},
}