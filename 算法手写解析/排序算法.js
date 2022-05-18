// 搜索/排序，都是基础
// 排序算法，把一个数组变为一个有序的数组

// 冒泡排序
// 算法时间复杂度 O(n^2)
function bubbleSort(arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
}

// 快速排序
// 找一个标志位，所有比他大的，放右边，所有比他小的放左边
// 时间复杂O(n * log n)
function quickSort(arr) {
    if (arr.length<2) {
        return arr
    }
    let flag = arr[0]
    let letf = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > flag) {
            right.push(arr[i])
        } else {
            letf.push(arr[i])
        }
    }
    return quickSort(letf).concat(flag,quickSort(right))
}

// 优化原地快排
// 由于快排每次递归会生成left和right两个数组（两个引用内存空间）浪费内存，我们用原地排序进行优化：
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (arr && Array.isArray(arr)) {
      // 如果左边界比右边界大，返回结果，排序结束
      if (left > right) return;
      // 定义移动的左游标，右游标
      let leftPoint = left;
      let rightPoint = right;
  
      // 定义一个基准值
      let temp = arr[left];
      // 判断左右游标是否重合，如果重合，循环结束
      while (leftPoint != rightPoint) {
        // 基准数在左边，因此从右边开始一个个扫描
        // 从右到左，寻找小于基准数的数，且左游标要小于右游标
        // 如果数字大于基准数（证明不符合条件），寻找下一个
        // 直到找到比基准数小的数，游标停止递减
        while (arr[rightPoint] >= temp && leftPoint < rightPoint) {
          rightPoint--;
        }
  
        // 从左到右，寻找大于基准数的数，且左游标要小于右游标
        // 如果数字小于基准数（证明不符合条件），寻找下一个
        // 直到找到比基准数小的数，游标停止递增
        while (arr[leftPoint] <= temp && leftPoint < rightPoint) {
          leftPoint++;
        }
  
        // 如果左游标小于右游标，则交换两个数字的位置
        if (leftPoint < rightPoint) {
          const changeNumber = arr[leftPoint];
          arr[leftPoint] = arr[rightPoint];
          arr[rightPoint] = changeNumber;
        }
      }
      // 重合之后，交换基准数
      arr[left] = arr[leftPoint];
      arr[leftPoint] = temp;
  
      // 递归操作左右两个数组
      quickSort(arr, left, leftPoint - 1);
      quickSort(arr, leftPoint + 1, right);
  
      return arr;
    }
  }
  
  console.log(quickSort([1, 20, 18, 222, 123, 33, -3]));