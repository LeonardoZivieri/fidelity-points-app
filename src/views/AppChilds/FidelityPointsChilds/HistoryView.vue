<template>
	<v-row v-if="this.customer !== null">
		<v-col cols="12" class="py-1">
			<v-data-table
					:headers="headers"
					:items="histories"
					:items-per-page="5"
					class="elevation-1"
				>
				<template v-slot:item.date="{ item }">
					{{ item.date | moment('from', 'now') }}
				</template>
				<template v-slot:item.point="{ item }">
					<span :class="{'red--text': item.point<0}"> {{ item.point }} </span>
				</template>
			</v-data-table>
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
		headers: [
			{ text: 'Horário', align: 'center', value: 'date' },
			{ text: 'Comentário', align: 'center', value: 'comment' },
			{ text: 'Pontos', align: 'center', value: 'point' },
		],
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
			this.$store.commit('fidelityPointsSetLoading', true)
			this.histories = await this.$store.getters.fidelityPointsCustomerGetCustomerHistory()
			this.$store.commit('fidelityPointsSetLoading', false)
		}
	}
}
</script>
