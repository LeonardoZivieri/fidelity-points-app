<template>
	<v-container>
		<v-row>
			<v-col
					cols="12"
					sm="8" offset-sm="2"
					md="6" offset-md="3"
				>
				<v-row v-show="loading">
					<v-col style="text-align: center">
						<v-progress-circular
								:size="50"
								:width="4"
								color="primary"
								indeterminate
							/>
					</v-col>
				</v-row>
				<router-view v-show="!loading"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import InputPoints from '@/components/Form/InputPoints'

export default {
	computed: mapGetters({
		'loading': 'fidelityPointsLoading',
		'customer': 'fidelityPointsCustomer'
	})
}
</script>
