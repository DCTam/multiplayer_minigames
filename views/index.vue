<template>
	<div>
		<topnav :buttons='buttons'></topnav>
		<homepage></homepage>
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

	function clickk(){
		alert('hi');
	}
</script>