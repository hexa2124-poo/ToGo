/**
 * JWT-style authentication using Script Properties.
 * Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH (SHA-256) and JWT_SECRET
 * in Project Settings > Script Properties before deploying.
 */

function login(username, password) {
  const props = PropertiesService.getScriptProperties()
  const validUsername = props.getProperty('ADMIN_USERNAME')
  const validHash = props.getProperty('ADMIN_PASSWORD_HASH')

  if (!validUsername || !validHash) {
    return { error: 'Admin credentials not configured. Set Script Properties.' }
  }

  const inputHash = sha256(password)

  if (username !== validUsername || inputHash !== validHash) {
    return { error: 'Invalid username or password' }
  }

  const token = createToken({ username, role: 'admin' })
  return {
    token,
    user: { id: '1', username, role: 'admin' },
  }
}

function sha256(text) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text)
  return digest.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('')
}

function createToken(payload) {
  const secret = PropertiesService.getScriptProperties().getProperty('JWT_SECRET') || 'change-me'
  const header = { alg: 'HS256', typ: 'JWT' }
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days

  const body = { ...payload, exp }

  const encHeader = base64UrlEncode(JSON.stringify(header))
  const encBody   = base64UrlEncode(JSON.stringify(body))
  const signature = base64UrlEncode(
    Utilities.computeHmacSha256Signature(`${encHeader}.${encBody}`, secret)
  )

  return `${encHeader}.${encBody}.${signature}`
}

function verifyToken(token) {
  try {
    const secret = PropertiesService.getScriptProperties().getProperty('JWT_SECRET') || 'change-me'
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [encHeader, encBody, signature] = parts
    const expectedSig = base64UrlEncode(
      Utilities.computeHmacSha256Signature(`${encHeader}.${encBody}`, secret)
    )
    if (signature !== expectedSig) return null

    const payload = JSON.parse(base64UrlDecode(encBody))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload
  } catch (e) {
    return null
  }
}

function requireAuth(authHeader) {
  const token = (authHeader || '').replace(/^Bearer\s+/i, '')
  const payload = verifyToken(token)
  if (!payload) {
    throw new Error('Unauthorized: invalid or missing token')
  }
  return payload
}

function base64UrlEncode(input) {
  let base64
  if (typeof input === 'string') {
    base64 = Utilities.base64Encode(input)
  } else {
    base64 = Utilities.base64Encode(input)
  }
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(input) {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) base64 += '='
  return Utilities.newBlob(Utilities.base64Decode(base64)).getDataAsString()
}

/**
 * Run once to generate a password hash for Script Properties.
 * Logger output gives you the SHA-256 hash to paste into ADMIN_PASSWORD_HASH.
 */
function generatePasswordHash() {
  const password = 'CHANGE_THIS_PASSWORD'
  Logger.log(sha256(password))
}
