const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();

// 設定圖片儲存目錄和檔案名稱
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 儲存目錄，請確保該目錄已存在
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // 檔案名稱
  }
});

// 建立multer中介軟體
const upload = multer({ storage: storage });

// 處理圖片上傳的POST請求
app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.send('圖片已成功上傳！');
  } else {
    res.status(400).send('上傳失敗！');
  }
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('伺服器已啟動，監聽埠號3000');
});
