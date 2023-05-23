<template>
	<div class="order-book">
		<h2>Биржевый стакана</h2>
		<table>
			<thead>
				<tr>
					<th>Bid Price</th>
					<th>Bid Quantity</th>
					<th>Ask Price</th>
					<th>Ask Quantity</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(bid, index) in bids"
					:key="index"
					:class="{ highlighted: isOurOrder(bid) }"
				>
					<td>{{ bid[0] }}</td>
					<td>{{ bid[1] }}</td>
					<td>{{ asks[index][0] }}</td>
					<td>{{ asks[index][1] }}</td>
				</tr>
			</tbody>
		</table>
		<UILoader v-if="loader" />
		<p>Spread: {{ calculateSpread }}</p>
		<p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
	</div>
</template>

<script setup>
	import { useSubcribeBook } from '@/composables/useSubcribe';
	import UILoader from '@/components/UI/UILoader.vue';

	const { loader, asks, bids, calculateSpread, errorMessage, isOurOrder } =
		useSubcribeBook();
</script>

<style scoped>
	.error-message {
		color: red;
	}
	.order-book {
		margin: 20px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 10px;
		text-align: center;
		border: 1px solid #ccc;
	}

	.highlighted {
		background-color: yellow;
		color: black;
	}
</style>
