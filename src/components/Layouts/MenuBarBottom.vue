<template>
	<div>
		<v-app-bar app color="indigo" dark class="text-center">
			<v-toolbar-title style="width:100%">
				<slot name="title"></slot>
			</v-toolbar-title>
		</v-app-bar>

		<v-content>
			<v-container fluid fill-height>
				<v-layout align-center justify-center>
					<v-flex text-xs-center>
						<slot></slot>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>

		<v-bottom-navigation
				:value="activeBtn"
				app
				absolute
				grow
				color="primary"
				height="76"
			>
			<v-btn to="/app/home">
				<span>Home</span>
				<v-icon>home</v-icon>
			</v-btn>
			<v-btn to="/app/fidelity-points">
				<span>Programa de fidelidade</span>
				<v-icon>favorite</v-icon>
			</v-btn>
			<v-btn to="/app/settings">
				<span>Configurações</span>
				<v-icon>settings</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'LayoutCentered',
	data: () => ({
		drawer: null,
		activeBtn: null,
	}),
	methods: {
		alert (message:string) {
			window.alert(message)
		},
		logout () {
			this.$store.dispatch('authLogout')
				.then(() => this.$router.push({ name: 'login' }))
		}
	}
})
</script>
