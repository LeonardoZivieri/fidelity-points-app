<template>
	<v-expansion-panel>
		<v-expansion-panel-header disable-icon-rotate>
			Sair
			<template v-slot:actions>
				<v-icon>power_settings_new</v-icon>
			</template>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
            <loading-indicator v-if="loading"/>
            <v-row justify="center">
                <v-col cols="12">
                    <v-btn block color="error" @click="logoff">confirmar</v-btn>
                </v-col>
            </v-row>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>

import LoadingIndicator from '@/components/Util/LoadingIndicator.vue'

export default {
	components: {
		LoadingIndicator
	},
	data: () => ({
		loading: false
	}),
	methods: {
		logoff: function () {
			this.loading = true
			this.$store.dispatch('authLogout').then(() => {
				this.$router.push({ name: 'login' })
			})
		}
	},
}
</script>
