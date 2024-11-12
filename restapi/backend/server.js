import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// app.use(
//       helmet.contentSecurityPolicy({
//         directives: {
//           connectSrc: ["'self'"],
//           defaultSrc: ["'self'"],
//           fontSrc: ["'self'"],
//           imgSrc: ["'self'"],
//           scriptSrc: ["'self'"],
//           styleSrc: ["'self'"],
//           frameSrc: ["'self'"],
//         },
//         reportOnly: true, // Set to 'true' to enable report-only mode
//       })   
//   );
  // app.use(function (req, res, next) {
  //   res.setHeader(
  //     'Content-Security-Policy',
  //     "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  //   );
  //   next();
  // });
const app = express();
const host = "localhost";
const port = 3000;


const persons = [
    {id:1,name:"Maci Laci", address:"Yellowstone"},
    {id:2,name:"Bubu", address:"Yellowstone"},
    {id:3,name:"Mekk Elek", address:"Budapest"},
    {id:4,name:"Hack Elek", address:"Budapest"}
]
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.send(JSON.stringify('Hello haver!')).status(200);
});
app.post('/macika', (req,res) =>{
    res.send(persons).status(200);
});
app.get('/search', (req,res) =>{
    const {searched} = req.query
    if (!searched) {
        res.status(400).json({ error: "Nem adtad meg a keresendő kifejezést!" });
        return
    }
   const result = persons.filter(({name}) => name.toLocaleLowerCase().indexOf(searched.toLocaleLowerCase()) >= 0)
    if (result.length > 0) {
        res.send(result).status(200);
        return
    }
    res.status(404).json({ error: "Nincs találat!" });
});

app.post('/save',(req,res)=>{
  const {name,address} = req.body
  if (!name || !address) {
    res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
    return
  }
  persons.push({name:name,address:address})
  res.status(201).json({success:"Sikeres adat rögzítés"})
  console.log(persons) 
})

app.put('/modify',(req,res) => {
    const {id,name,address} = req.body 
    if ((!id || !name || !address) && (id > 0)) {
        res.status(400).json({error: "Nem adta meg megfelelően az adatokat"})
        return
    }

    
    persons[id].name = name
    persons[id].address = address
    res.status(201).json({success:"Sikeres adat rögzítés", data:persons[id]})
    console.log(persons)
})


app.listen(port,host,() =>{ console.log(`A szerver fut a http://${host}:${port}-on!`)});