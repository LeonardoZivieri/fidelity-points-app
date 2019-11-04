<template>
	<LayoutCentered>
		<template v-slot:title>
			Login
		</template>

		<template v-slot:default>
			<v-form>
				<v-text-field label="Login" name="login" type="text"></v-text-field>
				<v-text-field label="Password" name="password" type="password"></v-text-field>
			</v-form>
		</template>

		<template v-slot:actions>
			<v-btn block color="primary" @click="login">Login</v-btn>
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
	methods: {
		login () {
			this.$router.push('app')
		}
	}
}
</script>
