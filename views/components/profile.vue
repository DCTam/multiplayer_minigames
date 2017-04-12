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
				<p class="title" v-if="userObj">{{userObj.wins || 0}}</p>
			</div>
			</div>
			<div class="level-item has-text-centered">
			<div>
				<p class="heading">Losses</p>
				<p class="title" v-if="userObj">{{userObj.losses || 0}}</p>
			</div>
			</div>
			<div class="level-item has-text-centered">
			<div>
				<p class="heading">Win Rate</p>
				<p class="title" v-if="userObj">{{winRate || 0}}%</p>
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

		data() {
			return {
				socket: null, //Socket connection
				userObj: null, //Hold user information
			}
		},
		mounted() {
			this.socket = io();

			this.socket.on('connect', () => {
				this.socket.emit('joinProfile', this.username);
			});

			this.socket.on('refreshStats', (userObj) => {
				this.userObj = userObj;
			});
		},
		computed: {

			winRate(){
				return (this.userObj.wins / (this.userObj.wins + this.userObj.losses)).toFixed(2);
			}

		},
		props:['username']
	}

</script>