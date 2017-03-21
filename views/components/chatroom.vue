<template>
	<div>
		<div class="columns">
			<div class="column is-half is-offset-one-quarter">
				<br>
				<div class="box">
					<!--Messages here-->
					<div id="messages" v-for="message in messages">
						{{message}}
					</div>
					
					<hr>
					<div class="field is-grouped">
						<form @submit.prevent="submitMsg(user)">
							<input v-model="input" class="input" type="text"autocomplete="off" />
							<button type="submit" class="button is-primary">Send</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: '',
				messages: []
			}
		},
		mounted() {
			let socket = socket || io();

			socket.on('push message', (info) => {
				this.messages.push(info.user.local.username + ": " +info.message);
			});
		},
		methods: {
			submitMsg(user){
				let socket = socket || io();
				socket.emit('chat message', {
					user: user,
					message: this.input
				});
				//this.messages.push(this.input);
				this.input = '';
			}
		}
		,
		props: ['user']
	}
	
</script>