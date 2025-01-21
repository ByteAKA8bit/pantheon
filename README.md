# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


- 连接钱包进行登录
- 登录后分享可以与神聊天，每个账号限制聊天3次数

## 接口
## 流程
1. 进入主页，获取上次连接的钱包地址
    1.1 如果存在地址，则直接登录(/user/login)，显示地址
    1.2 返回的数据更新积分

2. 连接钱包,获取钱包地址
    2.1 登录(/user/login)，显示地址
    2.2 返回的数据更新积分

3. 分享后，带token调用（/chat/open）, 成功则打开聊天窗口
    3.1 失败则提示错误
    3.2 正常则显示聊天窗口

4. 聊天对话接口带token调用（/chat/completions）
    4.1 发送完禁用发送按钮
    4.2 获取到数据，显示内容，按钮解禁
    4.3 返回数据中字段 isFinish 表示是否完成本轮对话，完成则禁用发送按钮
    4.4 返回数据中字段 affinity 表示亲密度

5. 聊天返回主页面调用（/user/info）, 刷新积分