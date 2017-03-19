<template>
	<div>
		<div class="columns">
			  <div class="column is-half is-offset-one-quarter">
				<form method="post" action="/signup">
					<!--Username-->
					<div class="field">
						<label class="label">Username</label>
						<p class="control has-icon has-icon-right">
							<input :class="{'is-danger': message.signUpMessage}" class="form-control input" type="text"  name="username">
							<span class="icon is-small">
							</span>
						</p>
						<p v-if="message.signUpMessage" class="help is-danger">{{message.signUpMessage[0]}}</p>
					</div>

					<!--Password-->
					<div class="field">
						<label class="label">Password</label>
						<p class="control has-icon has-icon-right">
							<input class="form-control input" type="password"  name="password">
							<span class="icon is-small">
							</span>
						</p>
					</div>

					<div class="field">
							<p class="control">
								<button type="submit" class="button is-success">Submit</button>
							</p>
					</div>
				</form>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['message']
		
	}

</script>

<style>

</style>