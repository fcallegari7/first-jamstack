document.getElementById("username-form").onsubmit = function(e) {
    e.preventDefault();
    const value = document.getElementById("username-input").value;
    listRepos(value);
};

const listRepos = async username => {
    const content = document.getElementById("content");
    content.innerHTML = 'Loading...';
    const repos = await fetch(
        `https://api.github.com/users/${username}/repos?type=owner&sort=updated`
    )
    .then(res => res.json())
    .catch(error => console.error(error));

    const markup = repos.map(repo => `
        <li>
            <a href="${repo.html_url}">${repo.name}</a>
            (⭐️ ${repo.stargazers_count})
        </li>
    `).join('');

    content.innerHTML = `<ul>${markup}</ul>`;
}