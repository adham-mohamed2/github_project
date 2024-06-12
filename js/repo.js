let content_right_section = document.querySelector(".content-right-section");
let title_header = document.querySelector(".title_header");
function gitrepo(){
    let repourl = document.location.search;
    let repoName = repourl.split("=")[1];
    let repo = repoName.split("%")[0];
    console.log(repo)
    console.log(repoName)
    if(repo){
        title_header.innerHTML=`showing issues for : ${repoName}`;
        git_api_issue(repo);
    }
    
}
gitrepo();

    
async function git_api_issue(repo){
    const response = await fetch(`https://api.github.com/repos/${repo}/issues`);
    const data = await response.json();
    displayissues(data);
    console.log(data)
}

function displayissues(issues){
    
    issues.forEach(issues => {
        content_right_section.innerHTML += `
            <a href="${issues.html_url}" class="box-right-section mb-2">
                <span class="username">${issues.title}</span>
                
            </a>
        `
    });
}
//<span id="issue">${issues.open_issues_count == 0 ?`<span class="icon-true"><i class="fa-solid fa-check"></i></span>` : `<span class="icon-false"><i class="fa-solid fa-xmark"></i></span> ${repo.open_issues_count} issue(s)` }</span>

