<template>
	<div>
		<topnav @selected="onSelect($event)"></topnav>
		<keep-alive>
			<component :is="selectedComponent"></component>
		</keep-alive>
	</div>
</template>

<script>
    export default {
		data() {
			return {
				selectedComponent: ''
			}
		},
		methods: {
			onSelect(button){
				this.selectedComponent = button.su ? 'signupform' : 'signinform';
			}
		}
    }
</script>