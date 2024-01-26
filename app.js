const express= require("express");//requiero express para crear un servidor html
const app=express();//inicializo express
const cheerio=require("cheerio");//requiero cheerio
const axios =require("axios");//requiero axios
const url=`https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap`;//creo la  constante url para escrapear wikipedia
const url2=`https://es.wikipedia.org`;

app.get("/",(req,res)=>{
    axios.get(url).then((response)=>{
        if (response.status === 200){
const html=response.data
const $= cheerio.load(html) //se constante cheerio $ en el cual cargo el html
const pageTitle=$("title").text();//creo una connt para el titulo en formato texto
const links=[];//creo una constante vacía para los enlaces de la pagina 
const imgs=[];//creo una constante vacía para las imgs de la pagina
const parrafos=[];//creo una constante vacía para los parrafos de la pagina
//console.log(html)
//res.send(html) 


$("a").each((index,element)=>{ //hago un bucle .each por cada "a" con el attributo "href "
    const link=$(element).attr("href")//pusheo todo en la const links
    links.push(link)})

    $("img").each((index,element)=>{//hago un bucle .each cada "img" con el attributo "src"
        const img=$(element).attr("src")//pusheo todo en la const imgs
        imgs.push(img)
    })

    $("p").each((index,element)=>{//hago un bucle .each cada "parrafo"
        const p=$(element)//pusheo todo en la const parrafos
        parrafos.push(p)
    })

   
    //Creo un res.send para enviar los elementos a la pagína
    res.send(`<h1>${pageTitle}</h1>
       <h2>Enlaces</h2>
       <ul>${links.map(link=> `<li><a href="${url2}${link}">${link}</a></li>`).join(``)}
       <h2>Imagenes</h2>
       ${imgs.map(img=> `<li><a href="${url2}${img}">${img}</a></li>`).join(``)}
       ${parrafos.map(p=> `<p>${p}</p>`).join(``)}
       </ul>
       `)
  


}})})
    
  


app.listen(3000,()=>{//haciendo escuchar el servidor
    console.log("express escuchando en el puerto 3000")
})