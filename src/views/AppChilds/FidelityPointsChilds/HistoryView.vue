<template>
	<v-row v-if="this.customer !== null">
		<v-col cols="12" class="py-1">
			<v-btn block color="secondary" :to="{name:routeBase+'.info'}">Voltar</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { firestore } from 'firebase'
import { mapGetters } from 'vuex'

import InputPoints from '@/components/Form/InputPoints'

export default {
	name: 'AppFidelityPointsHistoryView',
	data: () => ({
		routeBase: 'app.fidelity-points',
	}),
	mounted () {
		if (this.customer === null) {
			this.$router.push({ name: this.routeBase + '.search' })
		}
	},
	computed: mapGetters({
		'customer': 'fidelityPointsCustomer'
	}),
}
</script>
