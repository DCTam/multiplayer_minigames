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
					<p v-if="rooms[activeRoomId]" class="modal-card-title">{{rooms[activeRoomId].roomName}}</p>
				</header>
				<section class="modal-card-body">
					Hello
				</section>
				<footer class="modal-card-foot">
					<a v-if="isOwner" class="button is-success">Start game</a>
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
				isOwner: false,
				socket: null,
				roomName: '',
				rooms: {},
				activeRoomId: ''
			}
		},
		methods: {
			createRoom(username){
				this.socket.emit('createRoom', {
					ownerName: username,
					roomName: this.roomName
				});
				this.roomName = ''; //Reset field to blank after creating a room
				this.isActive = true;
				this.activeRoomId = this.socket.id;
				this.isOwner = true; //Set to true since you made the room
			},
			leaveRoom(){
				//Pass in activeRoomId and own id to see if you are owner of room or not
				this.socket.emit('leaveRoom', {
					ownerId: this.activeRoomId,
					leaverId: this.socket.id
				});
				console.log(this.activeRoomId + "\n" + this.socket.id);
				this.isActive = false; //Set to false to remove modal screen
				this.activeRoomId = '';
				this.isOwner = false; //Set to false to disable 'Start game' button
			},
			joinRoom(roomIdToJoin, player2username){
				//Join only if room has space
				if(this.rooms[roomIdToJoin].capacity != 2){
					//Pass in the id of room to join and username of joiner
					this.socket.emit('joinRoom', {
						roomIdToJoin: roomIdToJoin,
						player2username: player2username
					});
					this.activeRoomId = roomIdToJoin;
					this.isActive = true;
				}
				//If room has no space, show error
				else {
					console.log("no space");
				}
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
			
			//Close modal for player 2 if owner leaves
			this.socket.on('closePlayer2Screen', () => {
				this.isActive = false;
			});
			
		},
		props: ['username']
	}
</script>