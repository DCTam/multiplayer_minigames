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
				<p><strong>User id: </strong>{{user._id}}</p>
				<p><strong>Username: </strong>{{user.local.username}}</p>
				<p><strong>Password: </strong>{{user.local.password}}</p>
			</div>
		</article>
	</div>
</template>

<script>
	export default {
		props:['user']
	}

</script>