const arrayMin = array => {
	if (array.length===0) return Infinity;

	let min = array[0];

	for (let i = 1, l = array.length; i<l; ++i) if (array[i]<min) min = array[i];
	return min;
};

const arrayMax = array => {
	if (array.length===0) return -Infinity;

	let max = array[0];

	for (let i = 1, l = array.length; i<l; ++i) if (array[i]>max) max = array[i];
	return max;
};

const arrayNeedsUint32 = array => {
	for (let i = array.length - 1; i>=0; --i) if (array[i]>=65535) return true;
	return false;
};

const
	 TYPED_ARRAYS     = {
		 Int8Array        : Int8Array,
		 Uint8Array       : Uint8Array,
		 Uint8ClampedArray: Uint8ClampedArray,
		 Int16Array       : Int16Array,
		 Uint16Array      : Uint16Array,
		 Int32Array       : Int32Array,
		 Uint32Array      : Uint32Array,
		 Float32Array     : Float32Array,
		 Float64Array     : Float64Array
	 }, getTypedArray = (type, buffer) => new TYPED_ARRAYS[type](buffer),
	 _cache           = {};

const createElementNS     = name => document.createElementNS('http://www.w3.org/1999/xhtml', name),
      createCanvasElement = () => {
	      const canvas = createElementNS('canvas');
	      canvas.style.display = 'block';
	      return canvas;
      }, warnOnce         = message => {
	      if (message in _cache) return;
	      _cache[message] = true;

	      console.warn(message);
      };

export { arrayMin, arrayMax, arrayNeedsUint32, getTypedArray, createElementNS, createCanvasElement, warnOnce };