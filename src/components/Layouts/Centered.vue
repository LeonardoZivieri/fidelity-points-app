<template>
	<v-content>
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md4>
					<v-card class="elevation-12">
						<v-toolbar color="primary" dark flat>
							<v-toolbar-title>
								<slot name="title"></slot>
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<slot></slot>
						</v-card-text>
						<v-card-actions>
							<slot name="actions"></slot>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'LayoutCentered',
	data: () => ({
	})
})
</script>
