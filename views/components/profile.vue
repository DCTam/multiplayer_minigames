<template>
	<div>
		<nav class="level">
			<div class="level-item has-text-centered">
			<div>
				<p class="heading">Rank</p>
				<p class="title">#0</p>
			</div>
			</div>
			<div class="level-item has-text-centered">
			<div>
				<p class="heading">Wins</p>
				<p class="title">0</p>
			</div>
			</div>
			<div class="level-item has-text-centered">
			<div>
				<p class="heading">Losses</p>
				<p class="title">0</p>
			</div>
			</div>
			<div class="level-item has-text-centered">
			<div>
				<p class="heading">Win Rate</p>
				<p class="title">0%</p>
			</div>
			</div>
		</nav>
		<p>{{user._id}}</p>
		<p>{{user.local.username}}</p>
		<p>{{user.local.password}}</p>
	</div>
</template>

<script>
	export default {
		props:['user']
	}

</script>