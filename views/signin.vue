<template>
	<div>
		<topnav :buttons='buttons'></topnav>
		<signinform :message="message"></signinform>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				buttons:{				
					su: false,
					si: true
				}
			}
		}
		
	}
</script>