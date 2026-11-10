import { office, practiceAreas } from './config.js'

const icons = [
  `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="10" y="8" width="28" height="36" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M16 16h16M16 22h16M16 28h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M24 8v-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 36h32M12 36V16l12-8 12 8v20" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M20 36V26h8v10" stroke="currentColor" stroke-width="1.4"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="1.4"/><path d="M24 14v10l7 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 8l14 6v10c0 9.5-6.2 16.4-14 18.8C16.2 40.4 10 33.5 10 24V14l14-6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M18 24l4 4 8-9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
]

function setText(id, value, fallback) {
  const el = document.getElementById(id)
  if (!el) return
  el.textContent = value && String(value).trim() ? value : fallback
}

function renderContact() {
  setText('contact-city', office.city, 'Campina Grande – PB')
  setText('contact-address', office.address, 'Endereço completo a inserir')
  setText('contact-phone', office.phone, 'Telefone a inserir')
  setText('contact-email', office.email, 'E-mail a inserir')
  setText('footer-phone', office.phone, 'Telefone a inserir')
  setText('footer-email', office.email, 'E-mail a inserir')

  const wa = document.getElementById('whatsapp-btn')
  if (wa) {
    const number = String(office.whatsapp || '').replace(/\D/g, '')
    if (number) {
      const text = encodeURIComponent('Olá. Gostaria de informações sobre atendimento jurídico.')
      wa.href = `https://wa.me/${number}?text=${text}`
      wa.target = '_blank'
      wa.rel = 'noopener noreferrer'
    } else {
      wa.href = '#contato'
      wa.addEventListener('click', (event) => {
        event.preventDefault()
        document.getElementById('nome')?.focus()
      })
    }
  }

  const map = document.getElementById('map-slot')
  if (map && office.mapsEmbedUrl) {
    const iframe = document.createElement('iframe')
    iframe.src = office.mapsEmbedUrl
    iframe.title = 'Localização do escritório Matheus Galdino Advogado'
    iframe.loading = 'lazy'
    iframe.referrerPolicy = 'strict-origin-when-cross-origin'
    iframe.allowFullscreen = true
    map.classList.add('is-loaded')
    map.replaceChildren(iframe)
  }

  const socials = document.getElementById('socials')
  if (socials && Array.isArray(office.socials) && office.socials.length) {
    socials.hidden = false
    office.socials.forEach((item) => {
      if (!item?.url || !item?.label) return
      const a = document.createElement('a')
      a.href = item.url
      a.textContent = item.label
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      socials.appendChild(a)
    })
  }
}

function renderAreas() {
  const grid = document.getElementById('areas-grid')
  if (!grid) return

  practiceAreas.forEach((area, index) => {
    const article = document.createElement('article')
    article.className = 'area-card reveal'
    article.innerHTML = `
      <div class="area-card__icon">${icons[index % icons.length]}</div>
      <h3>${area.title}</h3>
      <p>${area.description}</p>
      <a class="area-card__link" href="#contato">Solicitar atendimento</a>
    `
    grid.appendChild(article)
  })
}

function setupHeader() {
  const header = document.getElementById('header')
  const toggle = document.getElementById('menu-toggle')
  const nav = document.getElementById('nav')

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  toggle?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open')
    nav.classList.toggle('is-open', open)
    toggle.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
    document.body.classList.toggle('nav-open', open)
  })

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open')
      toggle?.classList.remove('is-open')
      toggle?.setAttribute('aria-expanded', 'false')
      toggle?.setAttribute('aria-label', 'Abrir menu')
      document.body.classList.remove('nav-open')
    })
  })
}

function setupReveal() {
  const nodes = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((el) => el.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
  )
  nodes.forEach((el) => observer.observe(el))
}

function setupForm() {
  const form = document.getElementById('contact-form')
  const feedback = document.getElementById('form-feedback')
  if (!form || !feedback) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const nome = String(data.get('nome') || '').trim()
    const mensagem = String(data.get('mensagem') || '').trim()
    if (!nome || !mensagem) {
      feedback.textContent = 'Preencha seu nome e sua mensagem para continuar.'
      feedback.className = 'form-feedback is-error'
      return
    }

    const number = String(office.whatsapp || '').replace(/\D/g, '')
    if (!number) {
      feedback.textContent = 'O WhatsApp do escritório ainda não foi configurado.'
      feedback.className = 'form-feedback is-error'
      return
    }

    const text = encodeURIComponent(`Olá! Meu nome é ${nome}.\n\n${mensagem}`)
    const url = `https://wa.me/${number}?text=${text}`
    feedback.textContent = 'O WhatsApp será aberto para você revisar e enviar sua mensagem.'
    feedback.className = 'form-feedback is-ok'
    // Abre a conversa na mesma aba para evitar bloqueadores de pop-up.
    window.location.assign(url)
  })
}

document.getElementById('year').textContent = String(new Date().getFullYear())
renderContact()
renderAreas()
setupHeader()
setupReveal()
setupForm()
