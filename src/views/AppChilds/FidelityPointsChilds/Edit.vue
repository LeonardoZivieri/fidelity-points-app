<template>
	<v-row v-if="this.customer !== null">
		<v-col cols="12" class="py-1">
			<h2 class="text-center">
				{{ customer.saved ? 'Atualizando cliente' : 'Novo Cliente' }}
			</h2>
		</v-col>
		<v-col
				cols="12"
				lg="6"
			>
			<v-text-field
					v-model="form.name"
					label="Nome"
					counter="100"
				/>
		</v-col>
		<v-col
				cols="12"
				lg="6"
			>
			<v-text-field
					v-model="form.birthday"
					label="Data Nascimento"
					counter="100"
					v-mask="'##/##/####'"
				/>
		</v-col>
		<v-col cols="12">
			<v-text-field
					v-model="form.email"
					label="Email"
					counter="100"
				/>
		</v-col>
		<v-col cols="12" md="6" class="py-1 order-md-last">
			<v-btn block color="primary" @click="save">Salvar</v-btn>
		</v-col>
		<v-col cols="12" md="6" class="py-1">
			<v-btn block color="secondary" @click="cancel">Cancelar</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

import InputPoints from '@/components/Form/InputPoints'

export default {
	data: () => ({
		routeBase: 'app.fidelity-points',
		form: {
			name: '',
			email: '',
			birthday: '',
		}
	}),
	mounted () {
		if (this.customer === null) {
			this.$router.push({ name: this.routeBase + '.search' })
		} else {
			this.syncForm()
		}
	},
	watch: {
		customer () {
			this.syncForm()
		}
	},
	computed: mapGetters({
		'customer': 'fidelityPointsCustomer'
	}),
	methods: {
		cancel () {
			let action = this.customer.saved ? 'info' : 'search'
			this.$router.push({ name: this.routeBase + '.' + action })
		},
		async save () {
			this.$store.commit('fidelityPointsSetLoading', true)

			this.customer.name = this.form.name
			this.customer.email = this.form.email
			this.customer.birthday = new Date(this.form.birthday.split('/').reverse().join('-') + 'T12:00:00').getTime()

			await this.$store.dispatch('customerSave', this.customer)
			this.$router.push({ name: this.routeBase + '.info' })

			this.$store.commit('fidelityPointsSetLoading', false)
		},
		syncForm () {
			this.form.name = this.customer.name
			this.form.email = this.customer.email
			this.form.birthday = new Date(this.customer.birthday).toJSON().substr(0, 10).split('-').reverse().join('/')
		},
	}
}
</script>
