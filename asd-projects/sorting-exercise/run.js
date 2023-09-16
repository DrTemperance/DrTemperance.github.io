let STARTED = false;

$(document).ready(() =>
                     $('#goButton').on('click',() => {
                       if (!STARTED) {
                         STARTED = true;

                         if (bubbleSort) {
                           bubbleSort(bubbleList);
                         }
                         if (quickSort) {
                           quickSort(quickList,0,quickList.length - 1);
                         }
                       }
                     }));