const form = document.getElementById('userForm')
const usersList = document.getElementById('usersList')
const formMessage = document.getElementById('formMessage')

const API_URL = 'http://localhost:3000/api/users'

async function loadUsers () {
  usersList.innerHTML = 'Carregando usuários...'

  try {
    const response = await fetch(API_URL)
    const users = await response.json()

    usersList.innerHTML = ''

    if (users.length === 0) {
      usersList.innerHTML = 'Nenhum usuário cadastrado'
      return
    }

    users.forEach(user => {
      const div = document.createElement('div')
      div.classList.add('user-item')

      div.innerHTML = `
                <div class="user-header">
                    <h3>${user.name}</h3>
                    <span class="user-badge">ID ${user.id}</span>
                </div>

                <div class="user-details">
                    <div class="user-detail">
                        <span class="user-detail-label">Email:</span>
                        ${user.email}
                    </div>

                    <div class="user-detail">
                        <span class="user-detail-label">Idade:</span>
                        ${user.age}
                    </div>
                </div>
            `

      usersList.appendChild(div)
    })
  } catch (error) {
    usersList.innerHTML = 'Erro ao carregar usuários'
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const age = document.getElementById('age').value

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        age
      })
    })

    if (!response.ok) {
      throw new Error('Erro ao cadastrar usuário')
    }

    formMessage.innerHTML = `<div class="message success">Usuário cadastrado com sucesso</div>`

    form.reset()

    loadUsers()
  } catch (error) {
    formMessage.innerHTML = `<div class="message error">${error.message}</div>`
  }
})

loadUsers()
