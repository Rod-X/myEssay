// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/3sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
    const len = nums.length
    if(len<3){
        return []
    }
    nums.sort((a,b)=>(a-b))
    const arr= []
    for(let i=0;i<len-2;i++){
        if(i>0&&nums[i]===nums[i-1]){
            continue
        }
        let l = i+1
        let r = len-1
        const rest =  0-nums[i]
        //判断l  r 的值之和有可能是否等于rest  超出范围则不仅如此循环
        if(nums[l]<=rest&&2*nums[r]>=rest){
            // l  r 的值之和 大于rest时 r-- 小于rest时 l++ 等于时l++ r--
            // 无论++ -- l 和 r 位置的值都不等于上一次的值
            while(l<r){
                if(nums[l]+nums[r]===rest){
                    arr.push([nums[i],nums[l++],nums[r--]])
                    while(nums[l-1]===nums[l]){
                        l++
                    }
                    while(nums[r+1]===nums[r]){
                        r--
                    }
                }else if(nums[l]+nums[r]>rest){
                    r--
                    while(nums[r+1]===nums[r]){
                        r--
                    }
                }else{
                    l++
                    while(nums[l-1]===nums[l]){
                        l++
                    }
                }
            }
        }
    }
    return arr
};