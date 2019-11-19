<template lang="html">
	<v-row no-gutters>
		<v-col class="px-1">
			<v-btn block outlined color="error" @click="points += -5">
				-5
			</v-btn>
		</v-col>
		<v-col class="px-1">
			<v-btn block outlined color="error" @click="points += -1">
				-1
			</v-btn>
		</v-col>
		<v-col align-self="center" id="points-view" :class="{'text-center':true, 'error--text': points<0, 'success--text': points>0}" @dblclick="points = 0">
			{{ Math.abs(points) }}
		</v-col>
		<v-col class="px-1">
			<v-btn block outlined color="success" @click="points += +1">
				+1
			</v-btn>
		</v-col>
		<v-col class="px-1">
			<v-btn block outlined color="success" @click="points += +5">
				+5
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'InputPoints',
	props: ['value'],
	data: () => ({
		points: 0
	}),
	watch: {
		value (newValue, oldValue) {
			if (newValue !== this.points) {
				this.points = newValue
			}
		},
		points (newValue) {
			this.$emit('input', this.points)
		}
	}
}
</script>

<style lang="css" scoped>
	#points-view {
		user-select: none
	}
	#points-view.error--text:before {
		content: '-'
	}
	#points-view.success--text:before {
		content: '+'
	}
</style>
