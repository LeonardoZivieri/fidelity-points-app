<template>
	<v-row v-if="this.customer !== null">
		<v-col cols="12" class="py-1">
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-center">Horario</th>
							<th class="text-center">Comentario</th>
							<th class="text-center">Pontos</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="history in histories" :key="history.id">
							<td class="text-center"> {{ history.date | moment('from', 'now') }} </td>
							<td class="text-center"> {{ history.comment }} </td>
							<td class="text-center"> {{ history.point }} </td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-col>
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
		histories: [],
	}),
	mounted () {
		if (this.customer === null) {
			this.$router.push({ name: this.routeBase + '.search' })
		} else {
			this.loadMore()
		}
	},
	computed: mapGetters({
		'customer': 'fidelityPointsCustomer'
	}),
	methods: {
		async loadMore () {
			this.histories = await this.$store.getters.fidelityPointsCustomerGetCustomerHistory(
				this.histories.length,
				10,
			)
		}
	}
}
</script>
