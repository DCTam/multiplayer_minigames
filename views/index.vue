<template>
	<div>
		<topnav :buttons='buttons'></topnav>
		Home Page <br>
	</div>
</template>

<script>
    export default {
		data() {
			return {
				buttons: {
					su:false,
					si:false
				}
			}
		}
		
    }
</script>