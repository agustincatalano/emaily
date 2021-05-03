//import express from 'express'
const express = require('express')
const app = express()

app.get('/', (req, resp) => {
    resp.send({hi: 'there'})
})

app.listen(5000)

