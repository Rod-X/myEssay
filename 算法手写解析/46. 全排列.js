// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 function backtrack(list,nums,temp){
    //终止条件
    if(nums.length===0){
        return list.push([...temp])
    }
    for(let i = 0;i<nums.length;i++){
        let arr = [...nums]
        temp.push(arr.splice(i,1)[0])
        backtrack(list,arr,temp)
        temp.pop()
    }
}
var permute = function(nums) {
    let list = []
    backtrack(list,nums,[])
    return list
};

