const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// 1. تنظیمات پایه
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // دسترسی به همه فایل‌ها

// 2. مسیرهای اصلی
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. API مدیریت پست‌ها
const DATA_FILE = path.join(__dirname, 'data.json');

// خواندن پست‌ها
function readPosts() {
    try {
        return fs.existsSync(DATA_FILE) ? 
            JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) : [];
    } catch (err) {
        console.error('خطا در خواندن فایل:', err);
        return [];
    }
}

// ذخیره پست‌ها
function savePosts(posts) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// دریافت همه پست‌ها
app.get('/api/posts', (req, res) => {
    res.json(readPosts());
});

// ایجاد پست جدید
app.post('/api/posts', (req, res) => {
    const posts = readPosts();
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content,
        images: req.body.images || [],
        date: new Date().toLocaleString('fa-IR')
    };
    posts.push(newPost);
    savePosts(posts);
    res.status(201).json(newPost);
});

// 4. مدیریت خطاها
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// 5. اجرای سرور
app.listen(PORT, () => {
    console.log(`
    سرور با موفقیت اجرا شد!
    آدرس دسترسی: http://localhost:${PORT}
    
    نکات مهم:
    1. حتماً فایل index.html در پوشه اصلی وجود داشته باشد
    2. برای تست API از نرم‌افزار Postman استفاده کنید
    3. دکمه ⚙️ در صفحه برای پنل مدیریت است
    `);
});