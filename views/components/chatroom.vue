<template>
	<div>
		<div class="columns">
			<div class="column is-half is-offset-one-quarter">
				<br>
				<p>Users online: {{usersConnected}}</p>
				<div class="box">
					<!--Messages here-->
					<div id="msgBox" style="overflow-y: scroll; height:400px; overflow:auto;">
						<div id="messages" v-for="message in messages">
							{{message}}
						</div>
					</div>
	
					
					
					<hr>
					<div class="field is-horizontal" style="position: relative;">
						<form @submit.prevent="submitMsg(user)">
							<input v-model="input" class="input" type="text"autocomplete="off"/>
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
				messages: [],
				usersConnected: 0,
				socket: null
			}
		},
		mounted() {
			this.socket = io();

			this.socket.on('push message', (messageObj) => {
				this.messages.push(messageObj.user + ": " + messageObj.message);
				let d = document.getElementById("msgBox");
     			d.scrollTop = d.scrollHeight;
			});

			this.socket.on('updateOnlineUsers', (onlineCount) => {
				this.usersConnected = onlineCount;
			});

		},
		methods: {
			submitMsg(user){
				if(this.input == ''){return;}
				this.socket.emit('chat message', {
					user: user,
					message: this.input
				});
				this.input = '';
			}
		},
		props: ['user']
	}
	
</script>