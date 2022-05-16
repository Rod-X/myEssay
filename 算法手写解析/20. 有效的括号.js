// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/valid-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
    let stack =[]
    const mapObj = {
        '(':')',
        '[':']',
        '{':'}',
    }
    for(let i = 0;i<s.length;i++){
        //左侧符合入栈
        if(s[i] in mapObj){
            stack.push(s[i])
        }else{
            //匹配到右侧符号出栈，否则为不合法符合
           if( mapObj[stack.pop()]!==s[i]){
               return false
           }
        }
    }
    // 栈中长度必须为0，防止出现（【半边情况
    return !stack.length
};

// 作者：Rod_Web
// 链接：https://leetcode.cn/problems/valid-parentheses/solution/shi-yong-zhan-de-by-rod_web-2gtw/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。