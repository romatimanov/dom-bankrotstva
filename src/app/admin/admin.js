document.addEventListener('DOMContentLoaded', () => {
  const createSection = document.getElementById('create-article-section')
  const viewSection = document.getElementById('view-articles-section')
  const form = document.getElementById('article-form')
  let currentPage = 1
  const perPage = 10
  let totalPages = 1

  const editor = new Jodit('#editor', {
    height: 300,
    language: 'ru',
    uploader: {
      url: '/admin/upload.php',
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

    if (!title || !content || !tags) {
      alert('Заполните все поля!')
      return
    }

    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const firstImage = tempDiv.querySelector('img')

    let image_url = ''
    if (firstImage) {
      const src = firstImage.getAttribute('src') || ''

      if (src.startsWith('http://') || src.startsWith('https://')) {
        image_url = src
      } else if (src.startsWith('/')) {
        image_url = `${window.location.origin}${src}`
      } else {
        console.warn('⚠️ Невалидный URL изображения:', src)
      }
    }

    const editId = form.dataset.editId
    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `/admin/update_article.php?id=${editId}` : '/admin/save_article.php'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, tags, image_url })
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

  function formatDate(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  function loadArticles() {
    fetch('/admin/get_article.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const articles = data.data
          totalPages = Math.ceil(articles.length / perPage)
          const start = (currentPage - 1) * perPage
          const end = currentPage * perPage
          const paginated = articles.slice(start, end)

          const tbody = document.getElementById('articles-table-body')
          tbody.innerHTML = ''
          paginated.forEach((article) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
              <td>${article.id}</td>
              <td>${article.title}</td>
              <td>${article.tags}</td>
              <td class="date">${formatDate(article.created_at)}</td>
              <td>
                <button class="button-small" onclick="editArticle(${article.id})">
                <img src="/admin/icon/edit.svg" alt="edit" />
                </button>
                <button class="button-small" onclick="deleteArticle(${
                  article.id
                })">  <img src="/admin/icon/delete.svg" alt="edit" /></button>
              </td>
            `
            tbody.appendChild(tr)
          })

          renderPaginationComponent()
        } else {
          alert('Ошибка загрузки: ' + data.error)
        }
      })
  }

  function renderPaginationComponent() {
    const container = document.getElementById('pagination-container')
    container.innerHTML = ''

    const pagDiv = document.createElement('div')
    pagDiv.className = 'pagination'

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button')
      btn.innerText = i
      btn.className = i === currentPage ? 'active' : ''
      btn.addEventListener('click', () => {
        currentPage = i
        loadArticles()
      })
      pagDiv.appendChild(btn)
    }

    container.appendChild(pagDiv)
  }

  window.editArticle = function (id) {
    fetch(`/admin/get_article.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          document.getElementById('create-article-link').click()
          document.getElementById('title').value = data.data.title
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
      fetch('/admin/delete_article.php', {
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
