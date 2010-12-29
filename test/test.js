module('utils');
test('floorInBase', function() {
	expect(3);
	equals(100, $.plot.floorInBase(100, 10), 'Rounding down to nearest multiple of 10');
	equals(100, $.plot.floorInBase(107, 10), 'Rounding down to nearest multiple of 10');
	equals(100, $.plot.floorInBase(100.6, 1), 'Rounding down to nearest multiple of 1');
});