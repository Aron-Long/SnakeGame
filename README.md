# 贪吃蛇游戏 🐍

一个使用原生 JavaScript、HTML5 Canvas 和 CSS 开发的经典贪吃蛇游戏。

## 项目预览

![贪吃蛇游戏](screenshot.png)

## 功能特性

- ✨ **流畅的游戏体验** - 基于 Canvas 的流畅渲染
- 🎮 **多种操作方式** - 支持键盘方向键和屏幕按钮控制
- ⚡ **可调节速度** - 5 档速度自由切换(慢速/较慢/中速/较快/快速)
- 📊 **分数系统** - 实时得分显示和最高分记录
- 💾 **本地存储** - 最高分数据持久化保存
- ⏸️ **暂停功能** - 支持游戏暂停和继续
- 🎨 **精美 UI** - 现代化的界面设计和动画效果

## 游戏规则

1. 使用方向键或点击屏幕按钮控制蛇的移动方向
2. 蛇吃到食物后会增长并获得 10 分
3. 撞到墙壁或自己的身体游戏结束
4. 按空格键可以暂停/继续游戏
5. 通过滑块调整游戏速度以增加挑战

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript (ES6+)** - 游戏逻辑
- **Canvas API** - 游戏渲染

## 项目结构

```
snakegame/
├── index.html      # 主页面
├── style.css       # 样式文件
├── game.js         # 游戏逻辑
└── README.md       # 项目说明
```

## 快速开始

### 在线运行

直接用浏览器打开 [index.html](index.html) 文件即可开始游戏。

### 本地部署

1. 克隆或下载本项目
```bash
git clone <your-repository-url>
cd snakegame
```

2. 使用任意 HTTP 服务器运行项目

**方法一：使用 Python**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**方法二：使用 Node.js**
```bash
npx serve
```

**方法三：使用 VS Code**
- 安装 Live Server 扩展
- 右键点击 index.html 选择 "Open with Live Server"

3. 在浏览器中访问 `http://localhost:8000`

## 游戏控制

### 键盘操作
- `↑` - 向上移动
- `↓` - 向下移动
- `←` - 向左移动
- `→` - 向右移动
- `Space` - 暂停/继续

### 按钮操作
- 点击屏幕上的方向按钮控制蛇的移动
- 点击"开始游戏"按钮开始新游戏
- 点击"暂停"按钮暂停游戏

### 速度调节
使用速度滑块选择游戏难度：
- **慢速** (200ms) - 适合新手
- **较慢** (150ms) - 休闲模式
- **中速** (100ms) - 默认速度
- **较快** (70ms) - 进阶挑战
- **快速** (50ms) - 高手模式

## 核心代码说明

### 游戏配置

游戏使用 20x20 的网格系统,每个格子大小为 20 像素。

```javascript
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;
```

### 主要功能

- **initGame()** - 初始化游戏状态 ([game.js:41](game.js#L41))
- **generateFood()** - 生成食物位置 ([game.js:56](game.js#L56))
- **draw()** - 绘制游戏画面 ([game.js:70](game.js#L70))
- **update()** - 更新游戏状态 ([game.js:130](game.js#L130))
- **checkCollision()** - 碰撞检测 ([game.js:164](game.js#L164))
- **changeDirection()** - 改变蛇的方向 ([game.js:235](game.js#L235))

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- Opera

需要支持 HTML5 Canvas 和 ES6+ JavaScript 特性。

## 未来改进计划

- [ ] 添加音效
- [ ] 增加特殊食物(加速、减速、额外分数)
- [ ] 添加障碍物模式
- [ ] 实现双人对战模式
- [ ] 添加排行榜系统
- [ ] 移动端触摸滑动控制

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!

## 作者

Created with ❤️ by suxun

---

