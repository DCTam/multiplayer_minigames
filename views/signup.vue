<template>
	<div>
		<topnav :buttons='buttons'></topnav>
		<signupform :message="message"></signupform>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				buttons:{
					su: true,
					si: false
				}
			}
		}
	}
</script>