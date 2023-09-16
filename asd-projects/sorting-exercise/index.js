const bubbleSort = async array => {
        for (let i = 0; i<array.length; i++) {
          for (let j = array.length - 1; j>=i + 1; j--) {
            if (array[j].value<array[j - 1].value) {
              swap(array,j,j - 1);
              updateCounter(bubbleCounter);
              await sleep();
            }
          }
        }
      },
      quickSort  = async (array,left,right) => {
        if (right - left>0) {
          let index = await partition(array,left,right);
          left<index - 1 && await quickSort(array,left,index - 1);
          index<right && await quickSort(array,index,right);
        }
      };

async function partition(array,left,right) {
  let pivot = array[Math.floor((right + left) / 2)].value;
  while (left<right) {
    while (array[left].value<pivot) {
      left++
    }
    while (array[right].value>pivot) {
      right--
    }
    if (left<right) {
      swap(array,left,right);
      updateCounter(quickCounter);
      await sleep()
    }
  }
  return left + 1
}

function swap(array,i,j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  drawSwap(array,i,j)
}

function sleep() {return new Promise(resolve => setTimeout(resolve,SLEEP_AMOUNT));}

function drawSwap(array,i,j) {
  let element1 = array[i],element2 = array[j],temp = `${parseFloat($(element1.id).css('top'))}px`;
  $(element1.id).css('top',`${parseFloat($(element2.id).css('top'))}px`);
  $(element2.id).css('top',temp);
}

function updateCounter(counter) {
  $(counter).text(`Move Count: ${parseFloat($(counter).text().replace(/^\D+/g,'')) + 1}`);
}