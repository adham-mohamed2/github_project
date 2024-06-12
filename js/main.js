// variable
let content_right_section = document.querySelector(".content-right-section");
let user_input = document.querySelector("#user");
let git_user = document.querySelector(".git-user");
let language_repo = document.querySelector(".language-repo");
let header_topic = document.querySelector(".header-topic");



//event

git_user.addEventListener("click" , gituser);

language_repo.addEventListener("click" , handlelanguage)

// function

function handlelanguage(e){
    let lng = e.target.getAttribute('data-ln');
    if(lng){
        content_right_section.innerHTML = "";
        gitrepose_language(lng)
    }else{
        confirm("Please Click on language")
    }
}


async function gitrepose_language(lng){
    const response = await fetch(`https://api.github.com/search/repositories?q=${lng}`);
    const data = await response.json();
    console.log(data)
    displayuser(data.items , lng)
}


function gituser(){
    let user = user_input.value.trim();
    if(user){
        content_right_section.innerHTML = "";
        gitrepose(user)
    }else{
        confirm("Please Enter User")
    }
}

async function gitrepose(user){

    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await response.json();
    displayuser(data , user)
}

function displayuser(data , user){
    if(data.length == 0){
        content_right_section.innerHTML = "No repose..!";
        return;
    }
    header_topic.innerHTML = user;
    data.forEach(repo => {
        let name = repo.owner.login + "/" + repo.name;
       content_right_section.innerHTML += `
            <a href=./repo.html?repo=${name}' class="box-right-section mb-2">
                <span class="username">${repo.owner.login} / ${repo.name}</span>
                <span id="issue">${repo.open_issues_count == 0 ?`<span class="icon-true"><i class="fa-solid fa-check"></i></span>` : `<span class="icon-false"><i class="fa-solid fa-xmark"></i></span> ${repo.open_issues_count} issue` }</span>
            </a>
        `
    });
}