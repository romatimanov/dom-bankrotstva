document.addEventListener('DOMContentLoaded', () => {
  const createSection = document.getElementById('create-article-section')
  const viewSection = document.getElementById('view-articles-section')
  const form = document.getElementById('article-form')

  const editor = new Jodit('#editor', {
    height: 300,
    language: 'ru',
    uploader: {
      url: '/upload.php',
      insertImageAsBase64URI: false,
      filesVariableName: () => 'file',
      isSuccess: (resp) => resp.success,
      defaultHandlerSuccess: (data) => {
        const url = data.files[0]
        editor.selection.insertHTML(`<img src="${url}" alt="image">`)
        return url
      },
      error: (e) => {
        console.error('Ошибка загрузки:', e)
        alert('Ошибка при загрузке файла')
      }
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.getElementById('title').value.trim()
    const content = editor.value.trim()
    const tags = document.getElementById('tags').value.trim()
    const category = document.getElementById('category').value.trim()

    if (!title || !content || !tags || !category) {
      alert('Заполните все поля!')
      return
    }

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const firstImage = tempDiv.querySelector('img')
    const image_url = firstImage ? firstImage.src : ''

    const editId = form.dataset.editId
    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `/update_article.php?id=${editId}` : '/save_article.php'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, tags, image_url, category })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Статья сохранена!')
          delete form.dataset.editId
          form.reset()
          editor.value = ''
          document.getElementById('view-articles-link').click()
        } else {
          alert('Ошибка: ' + data.error)
        }
      })
      .catch((err) => {
        console.error(err)
        alert('Ошибка при сохранении')
      })
  })

  document.getElementById('create-article-link').addEventListener('click', (e) => {
    e.preventDefault()
    createSection.style.display = 'block'
    viewSection.style.display = 'none'
    form.reset()
    editor.value = ''
    delete form.dataset.editId
  })

  document.getElementById('view-articles-link').addEventListener('click', (e) => {
    e.preventDefault()
    createSection.style.display = 'none'
    viewSection.style.display = 'block'
    loadArticles()
  })

  function loadArticles() {
    fetch('/get_article.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const tbody = document.getElementById('articles-table-body')
          tbody.innerHTML = ''
          data.data.forEach((article) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
              <td>${article.id}</td>
              <td>${article.title}</td>
              <td>${article.category}</td>
              <td>${article.tags}</td>
              <td>${article.created_at}</td>
              <td>
                <button class="button-small" onclick="editArticle(${article.id})">Редактировать</button>
                <button class="button-small" onclick="deleteArticle(${article.id})">Удалить</button>
              </td>
            `
            tbody.appendChild(tr)
          })
        } else {
          alert('Ошибка загрузки: ' + data.error)
        }
      })
  }

  window.editArticle = function (id) {
    fetch(`/get_article.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          document.getElementById('create-article-link').click()
          document.getElementById('title').value = data.data.title
          document.getElementById('category').value = data.data.category
          document.getElementById('tags').value = data.data.tags
          editor.value = data.data.content
          form.dataset.editId = id
        } else {
          alert('Ошибка при загрузке статьи')
        }
      })
  }

  window.deleteArticle = function (id) {
    if (confirm('Удалить статью?')) {
      fetch('/delete_article.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            loadArticles()
          } else {
            alert('Ошибка удаления: ' + data.error)
          }
        })
        .catch((err) => {
          console.error('Ошибка запроса:', err)
          alert('Ошибка удаления статьи')
        })
    }
  }

  document.getElementById('create-article-link').click()
})
