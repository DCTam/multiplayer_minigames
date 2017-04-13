<template>
	<div>
		<nav class="nav has-shadow">

			<div class="nav-left nav-menu">
				<a href="/homepage" class="nav-item is-tab">RPS Hub</a>
			</div>

			<div class="nav-center nav-menu">
				<a @click="onClick(1)" :class="{'is-active': chatBool}" class="nav-item is-tab">Chatroom</a>
				<a @click="onClick(2)" :class="{'is-active': coinBool}" class="nav-item is-tab">CoinFlip</a>
				<a @click="onClick(3)" :class="{'is-active': rpsBool}" class="nav-item is-tab">RPS</a>
			<!--	<a @click="onClick(4)" :class="{'is-active': profileBool}" class="nav-item is-tab">Profile</a> -->
				<a @click="onClick(5)" :class="{'is-active': leaderBool}" class="nav-item is-tab">Leaderboard</a>
			</div>

			<div class="nav-right nav-menu">
				<a href='/logout' class="nav-item is-tab">Log Out</a>
			</div>

		</nav>
	</div>
</template>

<script>

	export default {
		data(){
			return {
				chatBool: false,
				coinBool: false,
				rpsBool: false,
				//profileBool: false,
				leaderBool: false
			}
		},
		methods: {
			onClick(num){
				if(num == 1){
					this.chatBool = true;
					this.coinBool = false;
					this.rpsBool = false;
					//this.profileBool = false;
					this.leaderBool = false;
					this.$emit('selected', 'chatroom');
				}
				if(num == 2){
					this.chatBool = false;
					this.coinBool = true;
					this.rpsBool = false;
					//this.profileBool = false;
					this.leaderBool = false;
					this.$emit('selected', 'coinflip');
				}
				if(num == 3){
					this.chatBool = false;
					this.coinBool = false;
					this.rpsBool = true;
					//this.profileBool = false;
					this.leaderBool = false;
					this.$emit('selected', 'rps');
				}
				if(num == 4){
					this.chatBool = false;
					this.coinBool = false;
					this.rpsBool = false;
					//this.profileBool = true;
					this.leaderBool = false;
					this.$emit('selected', 'profile');
				}
				if(num == 5) {
					this.chatBool = false;
					this.coinBool = false;
					this.rpsBool = false;
					//this.profileBool = false;
					this.leaderBool = true;
					this.$emit('selected', 'leaderboard');
				}

			}
		}
	}
</script>