<template>
	<v-row>
		<v-col>
			<v-text-field
					v-model="telefone"
					label="Telefone"
					v-mask="'(##) #####-####'"
					append-icon="search"
					@click:append="search"
					@keyup.enter="search"
				/>
		</v-col>
	</v-row>
</template>

<script>
import { firestore } from 'firebase'

import InputPoints from '@/components/Form/InputPoints'

export default {
	name: 'AppFidelityPointsSearch',
	data () {
		return {
			telefone: '',
		}
	},
	methods: {
		async search () {
			this.$store.commit('fidelityPointsSetLoading', true)

			let customer = await this.$store.dispatch('customerConsult', this.telefone.replace(/[^0-9]/g, ''))
			this.$store.commit('fidelityPointsSetCustomer', customer)

			let action = customer.saved ? 'info' : 'edit'
			this.$router.push({ name: 'app.fidelity-points.' + action })
			this.$store.commit('fidelityPointsSetLoading', false)
		},
	}
}
</script>
