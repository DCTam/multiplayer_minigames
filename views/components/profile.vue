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

		<article class="message">
			<div class="message-header">
				<p>Account details</p>
			</div>
			<div class="message-body">
				<p><strong>Username: </strong>{{username}}</p>
			</div>
		</article>
	</div>
</template>

<script>
	export default {
		props:['username']
	}

</script>