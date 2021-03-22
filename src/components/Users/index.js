import { useState } from 'react';
import c from './users.module.scss';

function Users({ setUser }) {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("")

  const getUsers = (url) => {
    fetch(url)
      .then(res => {
        if (res.status < 400) {
          return res.json()
        } else {
          throw res;
        }
      })
      .then(({ items }) => setUsers(items))
  }

  const getUser = (url) => {
    fetch(url)
      .then(res => {
        if (res.status < 400) {
          return res.json()
        } else {
          throw res;
        }
      })
      .then((data) => setUser(data))
  }

  const onClick = () => {
    if (value) {
      getUsers(`https://api.github.com/search/users?q=${value}`);
    }
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className={c.container}>
      <h2>First container</h2>
      <div className={c.border}>
        <h3>GitHub Searcher</h3>
        <div className={c.inputField}>
          <input
            type='text'
            placeholder="Search for Users"
            value={value}
            onChange={onChange}
          />
          <button type='button' onClick={onClick}>Search</button>
        </div>
        {users.length > 0 ?
          <ul>
            {users.map(({ login, avatar_url, id }) =>
              <li key={id} onClick={() => getUser(`https://api.github.com/users/${login}`)}>
                <img src={avatar_url} alt="" width="40px" height="40px" />
                <span>{login}</span>
                <span>id: {id}</span>
              </li>
            )}
          </ul>
          : <div className={c.empty}>No results</div>}
      </div>
    </div >
  );
}

export default Users;