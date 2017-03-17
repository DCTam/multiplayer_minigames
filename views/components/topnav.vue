<template>
	<div>
		<nav class="nav has-shadow">
			<div class="nav-left nav-menu">
				<a href="/" class="nav-item is-tab">CSGOBIGRIPOFFSITE</a>
			</div>
			<div class="nav-right nav-menu">
				<a @click="onClick(1)" :class="{'is-active': buttons.su}" class="nav-item is-tab">Sign Up</a>
				<a @click="onClick()" :class="{'is-active': buttons.si}" class="nav-item is-tab">Sign In</a>
			</div>
		</nav>
	</div>

</template>

<script>
	export default {
		data(){
			return {
				buttons:{				
					su: false,
					si: false
				}		
			}
		},
		methods: {
			onClick(button){
				if(!this.buttons.su && !this.buttons.si){
					if(button == 1) {this.buttons.su = true;}
					else {this.buttons.si = true;}
					this.$emit('selected', this.buttons);
				}
				else if(button == 1){
					this.buttons.su = true;
					this.buttons.si = false;
					this.$emit('selected', this.buttons);
				}
				else if(button != 1){
					this.buttons.su = false;
					this.buttons.si = true;
					this.$emit('selected', this.buttons);
				}
			}
		}
		
	}
</script>