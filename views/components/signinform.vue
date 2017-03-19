<template>
	<div>
		<div class="columns">
			  <div class="column is-half is-offset-one-quarter">
			  	<label class="label">Log in</label>
				<form method="post" action="/signin">
					<div class="field">
						<p class="control has-icon">
							<input class="input" placeholder="Username" name="username">
							<span class="icon is-small">
							<i class="fa fa-envelope"></i>
							</span>
						</p>
					</div>

					<div class="field">
						<p class="control has-icon">
							<input class="input" type="password" placeholder="Password" name="password">
							<span class="icon is-small">
							<i class="fa fa-lock"></i>
							</span>
						</p>
					</div>

					<div class="field">
						<p class="control">
						<button type="submit" class="button is-success">Login</button>
						</p>
					</div>
				</form>
				<p v-if="message.failMessage" class="help is-danger">{{message.failMessage[0]}}</p>

			  </div>
		</div>
	
	</div>

</template>

<script>
	export default {
		props: ['message']
		
	}

</script>