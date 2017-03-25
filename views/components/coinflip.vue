<template>
	<div>
		<div class="container">
			<nav class="panel">
				<p class="panel-heading">List of Rooms </p>

				<div v-for="room in rooms">
					<a class="panel-block">
					<span class="panel-icon"><i class="fa fa-user"></i></span>
					<p>{{room.ownerObj.roomName}}</p>
					</a>
				</div>
	
				<div class="panel-block">
					<input v-model="roomName" type="text" class="input" placeholder="Enter room name to create">
					<button @click="createRoom(username)" class="button is-primary is-outlined is-fullwidth">Create Room</button>
				</div>
			</nav>
		</div>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				'isActive': false,
				rooms: [],
				socket: null,
				roomName: ''
			}
		},
		methods: {
			createRoom(username){
				this.socket = this.socket || io();

				this.socket.on('connect', () => {
					//Send server room info to create room
					this.socket.emit('createRoom' + this.socket.id, {
						ownerName: username,
						roomName: this.roomName,
						roomId: this.socket.id
					});
					this.roomName = '';

					//Server responds back
					//roomInfo contains ownerObj, capacity, enemyName
					this.socket.on('roomCreated', (roomInfo) => {
						console.log(roomInfo);
						this.rooms.push(roomInfo);
						this.isActive = true;
					});

				});

			}
		},
		mounted(){

		},
		props: ['username']
	}
</script>