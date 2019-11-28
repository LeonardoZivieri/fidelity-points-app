<template>
	<v-row v-if="this.customer !== null">
		<v-col cols="12" class="py-1">
			<h2 class="text-center">{{customer.name}}</h2>
		</v-col>
		<v-col cols="12" class="py-1">
			<h3 class="text-center">Documento {{customer.getDocumentFormatted()}}</h3>
		</v-col>
		<v-col cols="12" class="py-1">
			<h3 class="text-center">Pontuação {{customer.getScore()}}</h3>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="primary" :to="{name: routeBase+'.edit'}">Editar</v-btn>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="accent" :to="{name: routeBase+'.view'}">Historico</v-btn>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="info" :to="{name: routeBase+'.registry'}">Registrar Evento</v-btn>
		</v-col>
		<v-col cols="12" class="py-1">
			<v-btn block color="secondary" :to="{name: routeBase+'.search'}">Procurar outro cliente</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { firestore } from 'firebase'
import { mapGetters } from 'vuex'

export default {
	name: 'AppFidelityPointsInfo',
	data: () => ({
		routeBase: 'app.fidelity-points'
	}),
	mounted () {
		if (this.customer === null) {
			this.$router.push({ name: this.routeBase + '.search' })
		}
	},
	computed: mapGetters({
		'customer': 'fidelityPointsCustomer'
	})
}
</script>
