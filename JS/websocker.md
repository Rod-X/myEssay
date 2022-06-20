<!-- WebSocket() -->
浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。

当你获取 Web Socket 连接后，你可以通过 send() 方法来向服务器发送数据，并通过 onmessage 事件来接收服务器返回的数据。

以下 API 用于创建 WebSocket 对象。
var aWebSocket = new WebSocket(url [, protocols]);
参数
url
要连接的 URL；这应该是 WebSocket 服务器将响应的 URL。
protocols 可选
一个协议字符串或者一个包含协议字符串的数组。这些字符串用于指定子协议，这样单个服务器可以实现多个 WebSocket 子协议（例如，您可能希望一台服务器能够根据指定的协议（protocol）处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。
抛出异常
SECURITY_ERR
正在尝试连接的端口被阻止。

<!-- 属性 -->
WebSocket.binaryType
WebSocket.binaryType 返回 websocket 连接所传输二进制数据的类型。
var binaryType = aWebSocket.binaryType;
"blob"
如果传输的是 Blob 类型的数据。
"arraybuffer"
如果传输的是 ArrayBuffer 类型的数据。

WebSocket.bufferedAmount
WebSocket.bufferedAmount是一个只读属性，用于返回已经被send()方法放入队列中但还没有被发送到网络中的数据的字节数。一旦队列中的所有数据被发送至网络，则该属性值将被重置为 0。但是，若在发送过程中连接被关闭，则属性值不会重置为 0。如果你不断地调用send()，则该属性值会持续增长

WebSocket.extensions
WebSocket.extensions是只读属性，返回服务器已选择的扩展值。目前，链接可以协定的扩展值只有空字符串或者一个扩展列表。

WebSocket.protocol
WebSocket.protocol 是个只读属性，用于返回服务器端选中的子协议的名字；这是一个在创建WebSocket 对象时，在参数protocols中指定的字符串，当没有已建立的链接时为空串。

WebSocket.readyState
返回当前 WebSocket 的链接状态，只读。
var readyState = WebSocket.readyState;
只读属性 readyState 表示连接状态，可以是以下值：

0 - 表示连接尚未建立。
1 - 表示连接已建立，可以进行通信。
2 - 表示连接正在进行关闭。
3 - 表示连接已经关闭或者连接不能打开。

WebSocket.url
WebSocket.url是一个只读属性，返回值为当构造函数创建WebSocket实例对象时 URL 的绝对路径。
var url = aWebSocket.url;


<!-- 方法 -->
WebSocket.close()
WebSocket.close() 方法关闭 WebSocket  连接或连接尝试（如果有的话）。 如果连接已经关闭，则此方法不执行任何操作。
code 可选
一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用 1005。CloseEvent的允许的状态码见状态码列表 。
reason 可选
一个人类可读的字符串，它解释了连接关闭的原因。这个 UTF-8 编码的字符串不能超过 123 个字节。

WebSocket.send()
 WebSocket.send() 方法将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的 data bytes 的大小来增加 bufferedAmount的值 。若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。

 event事件
 WebSocket.onclose
WebSocket.onclose 属性返回一个事件监听器，这个事件监听器将在 WebSocket 连接的readyState 变为 CLOSED时被调用，它接收一个名字为“close”的 CloseEvent 事件。
WebSocket.onclose = function(event) {
  console.log("WebSocket is closed now.");
};

// Create WebSocket connection
// 创建一个 WebSocket 连接
const socket = new WebSocket('ws://localhost:8080');

// Listen for possible errors
// 监听可能发生的错误
socket.addEventListener('error', function (event) {
  console.log('WebSocket error: ', event);
});

WebSocket: message event
message 事件会在 WebSocket 接收到新消息时被触发。

// 创建一个 WebSocket 连接
const socket = new WebSocket('ws://localhost:8080');

// 监听消息
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

WebSocket.onopen
WebSocket.onopen属性定义一个事件处理程序，当WebSocket 的连接状态readyState 变为1时调用;这意味着当前连接已经准备好发送和接受数据。这个事件处理程序通过 事件（建立连接时）触发。
aWebSocket.onopen = function(event) {
  console.log("WebSocket is open now.");
};