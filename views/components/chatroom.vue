<template>
	<div>
		<div class="columns">
			<div class="column is-half is-offset-one-quarter">
				<br>
				<p>Users online: {{usersConnectedMainChat}}</p>
				<div class="box">
					<!--Messages here-->
					<div id="msgBox" style="overflow-y: scroll; height:400px; overflow:auto;">
						<div id="messages" v-for="message in messages">
							{{message}}
						</div>
					</div>
	
					
					
					<hr>
					<div class="field is-horizontal" style="position: relative;">
						<form @submit.prevent="submitMsg(username)">
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
				usersConnectedMainChat: 0,
				socket: null			
			}
		},
		mounted() {
			this.socket = io();

			this.socket.on('connect', () => {
				this.socket.emit('joinMain');
				console.log(this.socket.id);
			});

			this.socket.on('push message', (messageObj) => {
				this.messages.push(messageObj.username + ": " + messageObj.message);
				let d = document.getElementById("msgBox");
     			d.scrollTop = d.scrollHeight;
			});

			this.socket.on('updateOnlineUsers', (onlineCount) => {
				this.usersConnectedMainChat = onlineCount;
			});

		},
		methods: {
			submitMsg(username){
				if(this.input == ''){return;}
				this.socket.emit('chat message', {
					username: username,
					message: this.input
				});
				this.input = '';
			}
		},
		props: ['username']
	}
	
</script>