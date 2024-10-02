import express from "express";
const app = express();
const host = "localhost";
const port = 3000;

const persons = [
    {name:"Maci Laci", address:"Yellowstone"},
    {name:"Bubu", address:"Yellowstone"},
    {name:"Mekk Elek", address:"Budapest"},
    {name:"Hack Elek", address:"Budapest"}
]
app.get('/', (req,res) =>{
    res.send('Hello haver!').status(200);
});
app.post('/macika', (req,res) =>{
    res.send(persons).status(200);
});
app.post('/keres', (req,res) =>{
    res.send(persons).status(200);
});

app.listen(port,host,() =>{ console.log(`A szerver fut a http://${host}:${port}-on!`)});