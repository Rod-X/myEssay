## 优势

## 节省磁盘空间并提升安装速度[](https://www.pnpm.cn/motivation#节省磁盘空间并提升安装速度)



## 安装

```
npm install -g pnpm@next-7
```

## 用法

| npm 命令        | pnpm 等价命令                                     |
| --------------- | ------------------------------------------------- |
| `npm install`   | [`pnpm install`](https://www.pnpm.cn/cli/install) |
| `npm i <pkg>`   | [`pnpm add `](https://www.pnpm.cn/cli/add)        |
| `npm run <cmd>` | [`pnpm `](https://www.pnpm.cn/cli/run)            |



当你使用一个未知命令时，pnpm 将会查找和该命令具有相同名称的脚本， 因此，`pnpm run lint` 和 `pnpm lint` 是一样的。如果没有相同名称的脚本的话， 那么 pnpm 将按照 shell 脚本的形式执行该命令，所以你可以执行类似 `pnpm eslint` (see [pnpm exec](https://www.pnpm.cn/cli/exec)) 指令的命令。

### add

| 命令                                                         | 含义                                   |
| ------------------------------------------------------------ | -------------------------------------- |
| `pnpm add sax`                                               | 保存到 `dependencies` 配置项下         |
| `pnpm add -D sax`                                            | 保存到 `devDependencies` 配置项下      |
| `pnpm add -O sax`                                            | 保存到 `optionalDependencies` 配置项下 |
| `pnpm add -g sax`                                            | 安装软件包到全局环境中                 |
| `pnpm add sax@next`                                          | 安装标记为 `next` 的版本               |
| `pnpm add sax@3.0.0`                                         | 安装指定版本 `3.0.0`                   |
| `pnpm add https://github.com/indexzero/forever/tarball/v0.5.6` | 安装指定地址命令                       |

  

- 来自 master 分支的最新 commit： `pnpm add kevva/is-positive`
- commit： `pnpm add kevva/is-positive#97edff6f525f192a3f83cea1944765f769ae2678`
- 分支： `pnpm add kevva/is-positive#master`
- 版本区间： `pnpm add kevva/is-positive#semver:^2.0.0`



