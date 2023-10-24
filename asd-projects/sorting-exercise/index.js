async function bubbleSort(array) {
  for (let i = 0; i<array.length; i++) {
	 for (let a = array.length - 1; a>=i + 1; a--) {
		array[a].value<array[a - 1].value && (swap(array,a,a - 1), updateCounter(bubbleCounter), await sleep());
	 }
  }
}

async function quickSort(array,left,right) {
  if (right - left>0) {
	 let t = await partition(array,left,right);
	 t - 1>left && quickSort(array,left,t - 1);
	 t<right && quickSort(array,t,right);
  }
}

async function partition(array,left,right) {
  let pivot = array[Math.floor((right + left) / 2)].value;
  while (left<right) {
	 while (array[left].value<pivot) {left++}
	 while (array[right].value>pivot) {right--}
	 if (left<right) {
		swap(array,left,right);
		updateCounter(quickCounter);
		await sleep()
	 }
  }
  return left + 1
}

async function swap(array,i,j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  drawSwap(array,i,j)
}

async function sleep() {return new Promise(resolve => setTimeout(resolve,50));}

async function drawSwap(array,i,j) {
  let {id: id1} = array[i],{id: id2} = array[j],temp = `${parseFloat($(id1).css('top'))}px`;

  $(id1).css('top',`${parseFloat($(id2).css('top'))}px`);
  $(id2).css('top',temp);
}

async function updateCounter(counter) {$(counter).text(`Move Count: ${parseFloat($(counter).text().replace(/^\D+/g,'')) + 1}`)}