import Alpine from 'alpinejs'   // 從 alpinejs 導入 Alpine 的主要物件
import { Generator } from './generator'  //  從 ./generator 導入 Generator

window.Alpine = Alpine;  
// 將 Alpine 掛載在全域 window 物件上

Alpine.data("password_generator", Generator);  // 註冊組件
Alpine.start();  // 啟動 Alpine.js
