<template>
	<v-Form
			v-if="this.customer !== null"
			v-model="registryForm.valid"
			ref="registryForm"
		>
		<v-row>
			<v-col cols="12">
				<v-textarea
						v-model="registryForm.comment"
						label="Comentário"
						auto-grow
						:rows="2"
						:rules="[(v) => !!v || 'Comentário obrigatorio']"
						counter="200"
					/>
			</v-col>
			<v-col cols="12">
				<InputPoints v-model="registryForm.points"/>
			</v-col>
			<v-col cols="12" md="6" class="py-1">
				<v-btn block color="primary" @click="registry()">Registrar</v-btn>
			</v-col>
			<v-col cols="12" md="6" class="py-1">
				<v-btn block color="secondary" :to="{name:routeBase+'.info'}">Voltar</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
import { mapGetters } from 'vuex'

import InputPoints from '@/components/Form/InputPoints'

export default {
	name: 'AppFidelityPointsHistoryRegister',
	components: {
		InputPoints
	},
	data: () => ({
		routeBase: 'app.fidelity-points',
		registryForm: {
			valid: false,
			comment: '',
			points: 0,
		}
	}),
	mounted () {
		if (this.customer === null) {
			this.$router.push({ name: this.routeBase + '.search' })
		}
	},
	computed: mapGetters({
		'customer': 'fidelityPointsCustomer'
	}),
	methods: {
		async registry () {
			this.$store.commit('fidelityPointsSetLoading', true)

			await this.$store.dispatch(
				'customerRegistryHistory',
				{
					customer: this.customer,
					comment: this.registryForm.comment,
					points: this.registryForm.points
				}
			)

			this.$router.push({ name: 'app.fidelity-points.info' })
			this.$store.commit('fidelityPointsSetLoading', false)
		}
	}
}
</script>
