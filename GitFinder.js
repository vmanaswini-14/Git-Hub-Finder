const input = document.querySelector("#usernameInput");
input.addEventListener("keydown",function(e)
{
    if(e.key==='Enter')
        searchUser();
});
async function searchUser() {
    const name = input.value.trim();
    if(name==='')
    {
        document.querySelector("#errorMsg").textContent="Please enter valid USERNAME";
        document.querySelector("#errorMsg").style.display = 'block';
        return;
    }
    document.querySelector("#errorMsg").style.display='none';
    document.querySelector("#loading").style.display='block';
    document.querySelector("#profileCard").style.display='none';
    try{
        const response = await fetch("https://api.github.com/users/"+name);
        if(!response.ok)
            throw new Error("NO DATA FOUND");
        const data = await response.json();
         document.querySelector("#loading").style.display='none';
    document.querySelector("#profileCard").style.display='block';
    document.querySelector("#avatar").src = data.avatar_url;
    document.querySelector("#profileName").textContent = data.name;
    document.querySelector("#profileLogin").textContent = "@"+data.login;
    document.querySelector("#bio").textContent = data.bio || "No bio Found";
    document.querySelector("#repos").textContent = data.public_repos;
    document.querySelector("#followers").textContent = data.followers;
    document.querySelector("#following").textContent = data.following;
    document.querySelector("#profileLink").href = data.html_url;
     document.querySelector("#profileLink").textContent = data.html_url;
    }
    catch(error){
    document.querySelector("#loading").style.display = 'none';
    document.querySelector("#errorMsg").textContent = "User not found! Check the username.";
    document.querySelector("#errorMsg").style.display = 'block';
}
}