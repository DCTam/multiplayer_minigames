<template>
	<div class="container">
		<div class="notification">
			<div class="content is-large" style="text-align:center;">
				<h1>Welcome to RPS Hub</h1>
				<p> Where you can compete against others in rock, paper and scissors!</p>
				<hr>
				<p>Please log in or sign up to access the games</p>
				<div class="block">
					<a class="button is-success" href="/signin">Log In</a>
					<a class="button is-success" href="/signup">Sign Up</a>
				</div>
			</div>
		</div>


		<article class="message is-primary">
			<div class="message-header">
				<p>New Public API</p>
			</div>
			<div class="message-body">
				<p>Currently only gives player's statistics in JSON format</p>
				<a href="/api">Click here to use!</a>
			</div>
		</article>
	
		<article class="message">
			<div class="message-header">
				<p>To-do Backlog</p>
			</div>
			<div class="message-body">
				<p>1) Create API to access player's game statistics (DONE)</p>
				<p>2) Bot to play against when no one is on</p>
				<p>3) Polish UI and add animations</p>
			</div>
		</article>
	</div>
</template>

<script>
	
</script>