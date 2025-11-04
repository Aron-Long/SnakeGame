// 游戏配置
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// 游戏常量
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

// 速度等级配置（毫秒）
const SPEED_LEVELS = {
    1: { speed: 200, label: '慢速' },
    2: { speed: 150, label: '较慢' },
    3: { speed: 100, label: '中速' },
    4: { speed: 70, label: '较快' },
    5: { speed: 50, label: '快速' }
};

// 游戏状态
let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let isPaused = false;
let gameStarted = false;
let currentSpeed = 3; // 默认中速
let gameSpeed = SPEED_LEVELS[currentSpeed].speed;

// 初始化高分
highScoreElement.textContent = highScore;

// 初始化游戏
function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    dx = 1;
    dy = 0;
    score = 0;
    isPaused = false;
    scoreElement.textContent = score;
    generateFood();
}

// 生成食物
function generateFood() {
    let foodPlaced = false;
    while (!foodPlaced) {
        food = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };

        // 确保食物不在蛇身上
        foodPlaced = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制网格
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }

    // 绘制蛇
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头
            ctx.fillStyle = '#4CAF50';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#4CAF50';
        } else {
            // 蛇身
            ctx.fillStyle = '#8BC34A';
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#8BC34A';
        }

        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
        ctx.shadowBlur = 0;
    });

    // 绘制食物
    ctx.fillStyle = '#FF5722';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FF5722';
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
    ctx.shadowBlur = 0;
}

// 更新游戏状态
function update() {
    if (isPaused) return;

    // 计算新的蛇头位置
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // 检查碰撞
    if (checkCollision(head)) {
        gameOver();
        return;
    }

    // 添加新头部
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;

        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }

        generateFood();
    } else {
        // 移除尾部
        snake.pop();
    }
}

// 检查碰撞
function checkCollision(head) {
    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        return true;
    }

    // 检查自身碰撞
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// 游戏主循环
function gameLoopFunc() {
    update();
    draw();
}

// 开始游戏
function startGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
    }

    initGame();
    gameStarted = true;
    startBtn.textContent = '重新开始';
    pauseBtn.disabled = false;
    pauseBtn.textContent = '暂停';

    gameLoop = setInterval(gameLoopFunc, gameSpeed);
    draw();
}

// 重启游戏循环（用于速度变化）
function restartGameLoop() {
    if (gameLoop && gameStarted && !isPaused) {
        clearInterval(gameLoop);
        gameLoop = setInterval(gameLoopFunc, gameSpeed);
    }
}

// 暂停游戏
function togglePause() {
    if (!gameStarted) return;

    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '继续' : '暂停';
}

// 游戏结束
function gameOver() {
    clearInterval(gameLoop);
    gameLoop = null;
    gameStarted = false;
    pauseBtn.disabled = true;

    // 显示游戏结束消息
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('游戏结束!', canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = 'bold 20px Arial';
    ctx.fillText(`得分: ${score}`, canvas.width / 2, canvas.height / 2 + 20);

    startBtn.textContent = '重新开始';
}

// 改变方向
function changeDirection(newDx, newDy) {
    // 防止反向移动
    if (dx === -newDx && newDx !== 0) return;
    if (dy === -newDy && newDy !== 0) return;

    dx = newDx;
    dy = newDy;
}

// 键盘事件
document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;

    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            changeDirection(0, -1);
            break;
        case 'ArrowDown':
            e.preventDefault();
            changeDirection(0, 1);
            break;
        case 'ArrowLeft':
            e.preventDefault();
            changeDirection(-1, 0);
            break;
        case 'ArrowRight':
            e.preventDefault();
            changeDirection(1, 0);
            break;
        case ' ':
            e.preventDefault();
            togglePause();
            break;
    }
});

// 按钮事件
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);

// 速度滑块事件
speedSlider.addEventListener('input', (e) => {
    currentSpeed = parseInt(e.target.value);
    gameSpeed = SPEED_LEVELS[currentSpeed].speed;
    speedValue.textContent = SPEED_LEVELS[currentSpeed].label;

    // 如果游戏正在进行，更新游戏循环速度
    restartGameLoop();
});

// 控制按钮事件
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!gameStarted) return;

        const direction = btn.dataset.direction;
        switch (direction) {
            case 'up':
                changeDirection(0, -1);
                break;
            case 'down':
                changeDirection(0, 1);
                break;
            case 'left':
                changeDirection(-1, 0);
                break;
            case 'right':
                changeDirection(1, 0);
                break;
        }
    });
});

// 初始绘制
draw();
