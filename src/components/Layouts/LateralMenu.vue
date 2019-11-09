<template>
	<div>

		<v-app-bar app color="indigo" dark clipped-left>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>
				<slot name="title"></slot>
			</v-toolbar-title>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app temporary>
			<v-list dense>
				<v-list-item @click="alert('home')">
					<v-list-item-action>
						<v-icon>home</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="alert('contact_mail')">
					<v-list-item-action>
						<v-icon>contact_mail</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Contact</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<hr class="mx-4 my-2">

				<v-list-item @click="logout">
					<v-list-item-action>
						<v-icon>power_off</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<v-container fluid fill-height>
				<v-layout align-center justify-center>
					<v-flex text-xs-center>
						<slot></slot>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>

		<v-footer color="indigo" app>
		</v-footer>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'LayoutCentered',
	data: () => ({
		drawer: null
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
