<template>
	<div>
		<div class="container">
			<nav class="panel">
				<p class="panel-heading">List of Rooms </p>
	
				<div v-for="room in rooms">
					<a @click="joinRoom(username)" class="panel-block">
						<span class="panel-icon"><i class="fa fa-user"></i></span>
						<p>({{room.capacity}}/2) - {{room.ownerObj.roomName}}</p>
					</a>
				</div>
	
				<div class="panel-block">
					<input v-model="roomName" type="text" class="input" placeholder="Enter room name to create">
					<button @click="createRoom(username)" class="button is-primary is-outlined is-fullwidth">Create Room</button>
				</div>
			</nav>
		</div>
	
		<div v-if="isActive" :class="{'is-active': isActive}" class="modal">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">{{activeRoom.ownerObj.roomName}}</p>
					<button @click="leaveRoom()" class="delete"></button>
				</header>
				<section class="modal-card-body">
					Hello
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success">Save changes</a>
					<a class="button">Cancel</a>
				</footer>
			</div>
		</div>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				'isActive': false,
				currentStatus: "Waiting for player to join",
				activeRoom: null,
				rooms: [],
				socket: null,
				roomName: ''
			}
		},
		methods: {
			createRoom(username) {
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

						//Test prints
						console.log(roomInfo);
						console.log(roomInfo.ownerObj);

						this.activeRoom = roomInfo;
						this.rooms.push(roomInfo);
						this.isActive = true;
					});
	
				});
	
			},
			leaveRoom(){

				this.socket.disconnect();

				this.isActive = false;

			},

			joinRoom(username){
				console.log(username + ' join the room');
			}
		},
		mounted() {
	
		},
		props: ['username']
	}
</script>