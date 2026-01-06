const cardWrapper=document.getElementById("card-wrapper")


fetch("https://randomuser.me/api/")
.then((userData)=>{
    return userData.json()
}).then((jsonData)=>{
 
    userData=jsonData.results[0]

    
    
    console.log(userData)

  
    const image=document.createElement("img")
    image.setAttribute("class","user-image")
    image.src=userData.picture.medium


    const userWrapper=document.createElement("div")
    userWrapper.setAttribute("class","user-wrapper")

    const name=document.createElement("h3")
    name.innerText=`${userData.name.first} ${userData.name.last}`

    const age=document.createElement("h3")
    age.setAttribute("class","user-age")
    age.innerText=userData.dob.age

  

    const email=document.createElement("h5")
    email.setAttribute("class","user-email")
    email.innerText=userData.email






    cardWrapper.append(image)
    cardWrapper.append(userWrapper)
    userWrapper.append(name)
    userWrapper.append(age)
    cardWrapper.append(email)


})


