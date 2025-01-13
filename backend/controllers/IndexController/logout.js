const express = require('express');
const cookieParser = require('cookie-parser');

const logout = (req,res) =>{
    res.clearCookie('token');
    res.status(200).json({ status: 'success' , message: "Logged out successfully" });
}

module.exports = logout;