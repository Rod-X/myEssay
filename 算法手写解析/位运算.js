/**
 * 位运算，相对于二进制的运算--
 * 
 * 会先把数字转为二进制位在进行运算
 * 
 * << n  转为二进制的情况下所有数字01向左移动n位，再在右边填充n个0  超出的就丢失
 * 
 * >> n 转为二进制的情况下，向右移动n位，左边填充n位0 右边的n位丢失
 * 
 * & 两个同时是1 时，结果得到1 否则0
 * 
 * | 两个同时是0是，结果是0，否则是1
 * 
 * ^ 异或运算符，两个数相同为false。不同为true
 */

// 二的整次幂  n 和 n-1 按位后
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    return n > 0 && (n & (n - 1)) === 0
};

// 作者：Rod_Web
// 链接：https://leetcode.cn/problems/power-of-two/solution/shi-yong-by-rod_web-jy3g/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
// 只出现一次的数字
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let ret = 0
    nums.forEach(n => {
        ret ^= n
    })
    return ret
};

// 源码中常用 | 进行授权 & 进行鉴权判断
// 位运算进行权限认证
// 每一个二进位标记一种状态
let STYLE = 1
let CLASS = 1 << 1
let CHILDREN = 1 << 2

// 授权
let vnodeType = STYLE | CLASS
// 011

//使用 & 进行鉴权 ---不为0 则存在权限
console.log(`vnodeType的类型 STYLE`, !!(vnodeType & STYLE))
console.log(`vnodeType的类型 CLASS`, !!(vnodeType & CLASS))
console.log(`vnodeType的类型 CHILDREN`, !!(vnodeType & CHILDREN))
// vnodeType的类型 STYLE true
// vnodeType的类型 CLASS true
// vnodeType的类型 CHILDREN false

// 删除授权--使用异或运算符
vnodeType ^= CLASS
console.log(`vnodeType的类型 STYLE`, !!(vnodeType & STYLE))
console.log(`vnodeType的类型 CLASS`, !!(vnodeType & CLASS))
console.log(`vnodeType的类型 CHILDREN`, !!(vnodeType & CHILDREN))
// vnodeType的类型 STYLE true
// vnodeType的类型 CLASS false
// vnodeType的类型 CHILDREN false