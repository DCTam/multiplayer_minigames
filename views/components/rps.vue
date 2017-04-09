<template>
	<div>
		<div class="container">
			<nav class="panel">

				<p class="panel-heading" style="text-align:left;">List of Rooms - Rock Paper Scissor
					<span style="float:right">Users connected in this lobby: {{usersConnectedRPS}}
					</span>
				</p>
	
				<div v-for="room in rooms">
					<a v-if="room.roomId" @click="joinRoom(room.roomId, username)" class="panel-block">
						<span class="panel-icon"><i class="fa fa-user"></i></span>
						<p>({{room.capacity}}/2) - {{room.roomName}}</p>
					</a>
				</div>
	
				<div class="panel-block">
					<input v-model="roomName" type="text" class="input" placeholder="Enter room name to create">
					<button @click="createRoom(username)" class="button is-primary is-outlined is-fullwidth">Create Room</button>
				</div>
				<p v-if="isRoomFullWhenJoining" class="help is-danger">Room is full!</p>
			</nav>
		</div>

		<div v-if="rooms[activeRoomId]" :class="{'is-active': rooms[activeRoomId]}" class="modal">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p v-if="rooms[activeRoomId]" class="modal-card-title">{{rooms[activeRoomId].roomName}}</p>
				</header>
				<section class="modal-card-body">
						<p>{{roomStatus}}
							<div v-if="isGameStarted && !isSelecting">
								{{gameDecision}}		
							</div>
							<div v-if="isSelecting" class="block">
								<a @click="userHasPicked('Rock')" class="button is-warning"><i class="fa fa-hand-rock-o" aria-hidden="true"></i> Rock</a>
								<a @click="userHasPicked('Paper')" class="button is-warning"><i class="fa fa-hand-paper-o" aria-hidden="true"></i> Paper</a>
								<a @click="userHasPicked('Scissor')" class="button is-warning"><i class="fa fa-hand-scissors-o" aria-hidden="true"></i> Scissor</a>
							</div>
							
						</p>
					
				</section>
				<footer class="modal-card-foot">
					<a v-if="isOwner && !isGameStarted" @click="startGame(activeRoomId)" class="button is-success">Start game</a>
					<a v-if="!isGameStarted" @click="leaveRoom()" class="button">Leave room</a>
				</footer>
			</div>
		</div>
	
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isOwner: false, //To determine ownership of room; enables "Start game" button
				isRoomFullWhenJoining: false, //Checks to see if room is full or not; displays error if it's full
				socket: null, //Socket connection
				isGameStarted: false, //False until receives broadcast from server
				roomStatus: '', //Display what to show when inside a room
				roomName: '', //Double binded text field to create room name
				rooms: {}, //List of rooms from the server
				activeRoomId: '', //To enable modal screen (play screen)
				timer: 3, //Three second timer before starting game
				winner: '', //Hold winner username when server returns result
				usersConnectedRPS: 0, //Hold number of users connected
				isSelecting: false, //Check to see if user is ready to pick RPS
				decisionStatus: null //Hold game decision
			}
		},
		methods: {
			createRoom(username){
				this.socket.emit('createRoom', {
					ownerName: username,
					roomName: this.roomName
				});
				this.roomName = ''; //Reset field to blank after creating a room
				this.activeRoomId = this.socket.id;
				this.isOwner = true; //Set to true since you made the room
				this.isRoomFullWhenJoining = false;
			},
			leaveRoom(){
				//Pass in activeRoomId and owner id to see if you are owner of room or not
				this.socket.emit('leaveRoom', {
					ownerId: this.activeRoomId,
					leaverId: this.socket.id
				});
				this.activeRoomId = '';
				this.isOwner = false; //Set to false to hide 'Start game' button
				this.isRoomFullWhenJoining = false;
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
					this.isRoomFullWhenJoining = false;
				}
				//If room has no space, show error
				else {
					this.isRoomFullWhenJoining = true;
				}
			},
			startGame(roomId){
				//If room is ready to start, tell server
				if(this.rooms[roomId].isReadyToStart){
					this.socket.emit('startGame', roomId);
				}
				//If not, display not ready status to owner
				else {
					this.roomStatus = 'Room is not ready to start. Please wait for second player';
				}
			},
			userHasPicked(choice){
				this.isSelecting = false;
				this.roomStatus = "You have selected: " + choice;
				this.gameDecision = 'Please wait for the other player to select';
				this.socket.emit('userHasSelected', {
					roomId: this.activeRoomId,
					isOwner: this.isOwner,
					userChoice: choice
				});

			}
		},
		mounted() {
			//Connect with socket.io when loaded
			this.socket = io();

			this.socket.on('connect', () => {
				this.socket.emit('joinRPSLobby');
			});

			//roomInfo[0] is the room list, roomInfo[1] is the number of connected users
			this.socket.on('refreshRPSRooms', (rooms) => {
				this.rooms = rooms;
				this.usersConnectedRPS = rooms['usersConnectedRPS'];
			});

			// this.socket.on('startingGame', (winner) => {
			// 	this.isGameStarted = true;
			// 	this.roomStatus = null;
			// 	this.winner = winner;
			// 	this.startCountdown();
			// });

			this.socket.on('startSelection', () => {
				this.roomStatus = null;
				this.isGameStarted = true;
				this.isSelecting = true;
			});

			//winnerObj contains winnerName and winnerChoice
			this.socket.on('gameDecision', (winnerObj) => {
				this.isGameStarted = false;
				this.isSelecting = false;
				if(winnerObj.winnerName){
					this.roomStatus = 'The winner is: ' + winnerObj.winnerName + " with " + winnerObj.winnerChoice;
				}
				else{
					this.roomStatus = "Both players picked " + winnerObj.winnerChoice;
				}


			});
			
		},
		watch: {
			rooms(newRoomList){

				//Change room status depending on how how many people are in the room
				if(newRoomList[this.activeRoomId]){
					newRoomList[this.activeRoomId].isReadyToStart ? this.roomStatus = "Game is now ready to start" : this.roomStatus = "Please wait for a player to join";
				}
				//Reset the activeRoomId if room doesnt exist anymore
				else {
					this.activeRoomId = '';
					this.isGameStarted = false;
				}

			}
		},
		props: ['username']
	}

</script>