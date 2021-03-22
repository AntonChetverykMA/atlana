import { useState, useEffect } from 'react';
import c from './user.module.scss';

const token = 'd7b88b96be90c389327e8cf8df148745e44b0ef1';

function User({ user }) {
  const [value, setValue] = useState("");
  const [repos, setRepos] = useState([]);

  const sortedArr = repos.filter(repo => {
    const nameL = repo.name.toLowerCase();
    const valueL = value.toLowerCase()
    return nameL.includes(valueL);
  }
  );

  const getRepos = (url) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      }
    })
      .then(res => {
        if (res.status < 400) {
          return res.json()
        } else {
          throw res;
        }
      })
      .then((data) => setRepos(data))
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (user) {
      getRepos(`https://api.github.com/users/${user.login}/repos`)
    }
  }, [user])

  return (
    <div className={c.container}>
      <h2>Second container</h2>
      <div className={c.border}>
        <h3>GitHub Searcher</h3>
        {user ?
          <>
            <div className={c.infoConteiner}>
              <img
                src={user.avatar_url}
                width="100px"
                height="100px"
                alt="" />
              <div className={c.info}>
                <span>{user.login}</span>
                <span>Email: {user.email || 'null'}</span>
                <span>Location: {user.location || 'null'}</span>
                <span>{user.created_at}</span>
                <span>Followers: {user.followers}</span>
                <span>Following: {user.following}</span>
              </div>
            </div>
            <div className={c.biography}>{user.bio ? user.bio : "Biography"}</div>
            <div className={c.inputField}>
              <input
                type='text'
                placeholder="Search for Repositories"
                value={value}
                onChange={onChange}
              />
            </div>
            {sortedArr.length > 0 && sortedArr.map(repo => <ul>
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                <div>
                  <span>Forks: {repo.forks_count}</span>
                  <span>Stars: {repo.stargazers_count}</span>
                </div>
              </li>
            </ul>)}
          </>
          : <div className={c.empty}>Choose a user</div>}
      </div>
    </div >
  );
}

export default User;