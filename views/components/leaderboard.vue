<template>
	<div>
	
		<nav class="level">
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
					<p class="heading">Ties</p>
					<p class="title" v-if="userObj">{{userObj.ties || 0}}</p>
				</div>
			</div>
			<div class="level-item has-text-centered">
				<div>
					<p class="heading">Win Rate</p>
					<p class="title" v-if="userObj">{{winRate || 0}}%</p>
				</div>
			</div>
		</nav>
	
		<table class="table">
			<thead>
				<tr>
					<th><abbr>Rank#</abbr></th>
					<th>Username</th>
					<th><abbr>Wins</abbr></th>
					<th><abbr>Losses</abbr></th>
					<th><abbr>Ties</abbr></th>
					<th><abbr>Win Rate</abbr></th>
				</tr>
			</thead>
			<tr v-for="(player, index) in playerList">
				<th>{{index + 1}}</th>
				<td>{{player.username}}</td>
				<td>{{player.wins}}</td>
				<td>{{player.losses}}</td>
				<td>{{player.ties}}</td>
				<td>{{(player.wins / (player.wins + player.losses)).toFixed(2)}}</td>
			</tr>
	
		</table>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				socket: null, //Socket connection
				userObj: null, //Hold user information
				playerList: null //Hold array of player information
			}
		},
		mounted() {
			this.socket = io();

			this.socket.on('connect', () => {
				this.socket.emit('joinProfile', this.username);
			});

			this.socket.on('refreshProfileStats', (userObj) => {
				this.userObj = userObj;
			});
			
			this.socket.on('refreshLeaderBoard', (playerList) => {
				this.playerList = playerList;
			});
		},
		computed: {

			winRate(){
		
				return this.userObj.losses == 0 ? 100 : (this.userObj.wins / (this.userObj.wins + this.userObj.losses)).toFixed(2);
			}

		},
		props:['username']
	}

</script>