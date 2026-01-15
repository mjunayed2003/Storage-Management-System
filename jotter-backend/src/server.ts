import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';

// এনভায়রনমেন্ট ভেরিয়েবল কনফিগারেশন
dotenv.config();

const PORT = process.env.PORT || 5000;

// ডাটাবেস কানেকশন এবং সার্ভার স্টার্ট
const startServer = async () => {
    try {
        // ১. ডাটাবেস কানেক্ট করা
        await connectDB();
        
        // ২. সার্ভার লিসেন করা
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
            console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();