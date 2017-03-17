<template>
	<div>
		<nav class="nav has-shadow">
			<div class="nav-left nav-menu">
				<a href="/" class="nav-item is-tab">CSGOBIGRIPOFFSITE</a>
			</div>
			<div class="nav-right nav-menu">
				<a href="signup" :class="{'is-active': su}" class="nav-item is-tab">Sign Up</a>
			<a href="signin" :class="{'is-active': si}" class="nav-item is-tab">Sign In</a>
			</div>
		</nav>
	</div>

</template>

<script>
	export default {
		data(){
			return {
			
			}
		},
		props:['su','si']
		
	}
</script>