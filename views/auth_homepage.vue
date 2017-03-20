<template>
	<div>
		<authnav @selected="selectedComponent = $event"></authnav>
		<keep-alive>
			<component :user="user" :is="selectedComponent"></component>
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