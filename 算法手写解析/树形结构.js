/**
 * 104. 二叉树的最大深度
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {

    if(root === null){
        return 0
    }
    //递归，深入每个数的末端，获取每个分支的深度，比较大的，保留  +1 当前根节点
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1
};

/**
 * 226. 翻转二叉树
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var invertTree = function(root) {
    // 末端不需要再往下翻转
    if(root===null){
        return null
    }
    //翻转当前二叉树，并递归翻转
    [root.left,root.right] = [invertTree(root.right),invertTree(root.left)]
    return root
};

// 作者：Rod_Web
// 链接：https://leetcode.cn/problems/invert-binary-tree/solution/di-gui-by-rod_web-bffk/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
