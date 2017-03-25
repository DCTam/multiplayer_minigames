<template>
	<div>
		<authnav @selected="selectedComponent = $event"></authnav>
		<keep-alive>
			<component :username="username" :is="selectedComponent"></component>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectedComponent: ''
			}
		}
	}

</script>