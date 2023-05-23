import { ref, onMounted, computed } from 'vue';
export function useSubcribeBook() {
	const errorMessage = ref(false);
	const bids = ref([]);
	const asks = ref([]);
	const loader = ref(false);
	const ourOrders = ref([
		{
			id: 1342,
			pair: 'RTD_USDT',
			price: 0.2,
			amount: 0.001,
			side: true,
		},
		{
			id: 1343,
			pair: 'RTD_USDT',
			price: 0.3,
			amount: 0.0015,
			side: false,
		},
	]);

	const subscribeToOrderBookStream = () => {
		loader.value = true;
		// симуляция веб-сокета)
		setInterval(() => {
			try {
				const data = {
					lastUpdateId: 202,
					bids: [
						['0.0024', '10'],
						['0.2', '20'],
						['0.0022', '30'],
					],
					asks: [
						['0.0026', '10'],
						['0.0027', '20'],
						['0.0028', '30'],
					],
				};
				processOrderBookStreamData(data);
			} catch (error) {
				errorMessage.value = 'Smth went wrong';
				console.error(error);
			} finally {
				loader.value = false;
			}
		}, 3000);
	};

	const processOrderBookStreamData = data => {
		try {
			bids.value = data.bids;
			asks.value = data.asks;
			errorMessage.value = '';
		} catch (err) {
			errorMessage.value = 'Ошибка при обработке бронирование данных ';
			console.error(err);
		}
	};

	const isOurOrder = order => {
		const orderPrices = ourOrders.value.map(order => order.price);
		console.log(orderPrices);
		console.log(order);
		return orderPrices.includes(parseFloat(order[0]));
	};

	const calculateSpread = computed(() => {
		if (bids.value.length > 0 && asks.value.length > 0) {
			const bestBid = parseFloat(bids.value[0][0]);
			const bestAsk = parseFloat(asks.value[0][0]);
			return (bestAsk - bestBid).toFixed(7);
		}
		return 0;
	});

	onMounted(() => {
		subscribeToOrderBookStream();
	});

	return {
		errorMessage,
		asks,
		bids,
		isOurOrder,
		calculateSpread,
		loader,
	};
}
