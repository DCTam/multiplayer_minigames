<template>
	<div>
		<div class="container">
			<nav class="panel">
				<p class="panel-heading">List of Rooms </p>
	
				<div v-for="room in rooms">
					<a @click="joinRoom(room.roomId, username)" class="panel-block">
						<span class="panel-icon"><i class="fa fa-user"></i></span>
						<p>({{room.capacity}}/2) - {{room.roomName}}</p>
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
					<p class="modal-card-title">{{rooms[activeRoomId].roomName}}</p>
				</header>
				<section class="modal-card-body">
					Hello
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success">Save changes</a>
					<a @click="leaveRoom()" class="button">Leave room</a>
				</footer>
			</div>
		</div>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isActive: false,
				socket: null,
				roomName: '',
				rooms: {},
				activeRoomId: ''
			}
		},
		methods: {
			createRoom(user){
				this.socket.emit('createRoom', {
					ownerName: user,
					roomName: this.roomName
				});
				this.roomName = '';
				this.isActive = true;
				this.activeRoomId = this.socket.id;
			},
			leaveRoom(){

				this.socket.emit('removeRoom', this.socket.id);
				this.isActive = false;
				this.activeRoomId = '';
			},
			joinRoom(roomIdToJoin, player2username){
				//Pass in the id of room to join and username of joiner
				this.socket.emit('joinRoom', [roomIdToJoin, player2username]);

			}
		},
		mounted() {
			//Connect with socket.io when loaded
			this.socket = io();

			this.socket.on('connect', () => {
				this.socket.emit('displayCoinFlipRooms');
			});

			this.socket.on('refreshCoinFlipRooms', (rooms) => {
				this.rooms = rooms;
			});
			
		},
		props: ['username']
	}
</script>