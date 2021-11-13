require("./models/Publicado")
const Pub = mongoose.model("publicados")

console.log('a')

async function  curtir(user, idUser, idPubli){

await user.findByIdAndUpdate({_id: idUser }, { $push: { curtidas: idPubli } })
  .then(x => {
    
    userCcLength ++
      userCurtidas.push(idPubli)
      
      
  })
  .catch(e => {
    console.log('nao salvo')
    })

var curtiu

Pub.findById({_id:idPubli}).then((pubs)=>{

curtiu =  pubs.publiCurtidas

curtiu++

Pub.findByIdAndUpdate({_id:idPubli}, {publiCurtidas: curtiu})
.then(x => {
res.redirect('/home')

})
.catch(e => {
console.log('nao salvo')
})
})

}