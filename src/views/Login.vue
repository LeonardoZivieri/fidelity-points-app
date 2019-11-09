<template>
	<LayoutCentered>
		<template v-slot:title>
			Login
		</template>

		<template v-slot:default>
			<v-form>
				<v-text-field label="Login" v-model="userLogin" name="login" type="text"></v-text-field>
				<v-text-field label="Password" v-model="userPassword" name="password" type="password"></v-text-field>
				<v-alert dense outlined color="red" v-if="error">{{error}}</v-alert>
			</v-form>
		</template>

		<template v-slot:actions>
			<v-btn block color="primary" @click="login" :disabled="consulting">Login</v-btn>
		</template>
	</LayoutCentered>
</template>

<script>
// @ is an alias to /src
import LayoutCentered from '@/components/Layouts/Centered.vue'

export default {
	name: 'home',
	components: {
		LayoutCentered
	},
	data: () => ({
		error: false,
		userLogin: '',
		userPassword: '',
		consulting: false
	}),
	methods: {
		async login () {
			this.error = false
			this.consulting = true
			try {
				const success = await this.$store.dispatch(
					'authLogin',
					{
						email: this.userLogin,
						password: this.userPassword
					}
				)
				this.$router.push({ name: 'app' })
			} catch (e) {
				if (e.code.startsWith('auth/')) {
					this.error = 'Invalid Login'
				} else {
					this.error = e.message
				}
			}
			this.consulting = false
			return null
		}
	}
}
</script>
