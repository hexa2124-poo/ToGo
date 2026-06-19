/**
 * TO GO COFFEE — Apps Script Backend
 * REST API over Google Sheets, with JWT auth for admin routes.
 *
 * DEPLOY:
 * 1. Extensions > Apps Script in your Google Sheet
 * 2. Paste this file + Auth.gs + Sheets.gs
 * 3. Project Settings > Script Properties: add JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD_HASH
 * 4. Deploy > New deployment > Web app > Execute as Me, Access: Anyone
 * 5. Copy the deployment URL into NEXT_PUBLIC_API_URL
 */

function doGet(e) {
  return handleRequest(e, 'GET')
}

function doPost(e) {
  return handleRequest(e, 'POST')
}

function doPut(e) {
  return handleRequest(e, 'PUT')
}

function doDelete(e) {
  return handleRequest(e, 'DELETE')
}

/**
 * Apps Script web apps only natively support GET/POST.
 * The Next.js proxy sends the real method in a header-equivalent query param `_method`,
 * and PUT/DELETE bodies arrive via POST. This router normalizes that.
 */
function handleRequest(e, method) {
  try {
    const params = e.parameter || {}
    const actualMethod = params._method || method
    const path = (params.path || '').replace(/^\/+|\/+$/g, '')
    const segments = path.split('/').filter(Boolean)

    let body = {}
    if (e.postData && e.postData.contents) {
      try { body = JSON.parse(e.postData.contents) } catch (err) { body = {} }
    }

    const authHeader = params._auth || ''
    const resource = segments[0]
    const id = segments[1]

    let result

    switch (resource) {
      case 'auth':
        result = handleAuth(segments[1], body)
        break
      case 'products':
        result = handleProducts(actualMethod, id, body, authHeader)
        break
      case 'categories':
        result = handleCategories(actualMethod, id, body, authHeader)
        break
      case 'orders':
        result = handleOrders(actualMethod, id, body, params, authHeader)
        break
      case 'reviews':
        result = handleReviews(actualMethod, id, body, params, authHeader)
        break
      case 'settings':
        result = handleSettings(actualMethod, body, authHeader)
        break
      default:
        result = { error: 'Unknown resource: ' + resource }
    }

    return jsonResponse(result)
  } catch (err) {
    return jsonResponse({ error: err.message || 'Internal server error' }, 500)
  }
}

function jsonResponse(obj, status) {
  const output = ContentService.createTextOutput(JSON.stringify(obj))
  output.setMimeType(ContentService.MimeType.JSON)
  return output
}

// ── PRODUCTS ───────────────────────────────────────────────────────────────────
function handleProducts(method, id, body, authHeader) {
  if (method === 'GET') {
    return id ? getRowById('Products', id) : getAllRows('Products')
  }
  requireAuth(authHeader)
  if (method === 'POST') return insertRow('Products', body)
  if (method === 'PUT')  return updateRow('Products', id, body)
  if (method === 'DELETE') return deleteRow('Products', id)
}

// ── CATEGORIES ─────────────────────────────────────────────────────────────────
function handleCategories(method, id, body, authHeader) {
  if (method === 'GET') {
    return id ? getRowById('Categories', id) : getAllRows('Categories')
  }
  requireAuth(authHeader)
  if (method === 'POST') return insertRow('Categories', body)
  if (method === 'PUT')  return updateRow('Categories', id, body)
  if (method === 'DELETE') return deleteRow('Categories', id)
}

// ── ORDERS ───────────────────────────────────────────────────────────────────────
function handleOrders(method, id, body, params, authHeader) {
  if (method === 'GET') {
    if (id) return getRowById('Orders', id)
    requireAuth(authHeader)
    let rows = getAllRows('Orders')
    if (params.status) rows = rows.filter(r => r.status === params.status)
    return rows
  }
  if (method === 'POST') {
    body.id = body.id || generateOrderId()
    body.status = body.status || 'pending'
    body.createdAt = new Date().toISOString()
    body.updatedAt = new Date().toISOString()
    return insertRow('Orders', body)
  }
  requireAuth(authHeader)
  if (method === 'PUT') {
    body.updatedAt = new Date().toISOString()
    return updateRow('Orders', id, body)
  }
}

// ── REVIEWS ──────────────────────────────────────────────────────────────────────
function handleReviews(method, id, body, params, authHeader) {
  if (method === 'GET') {
    let rows = getAllRows('Reviews')
    if (params.approved === 'true') rows = rows.filter(r => r.isApproved === true || r.isApproved === 'true')
    return rows
  }
  if (method === 'POST') {
    body.isApproved = false
    body.createdAt = new Date().toISOString()
    return insertRow('Reviews', body)
  }
  requireAuth(authHeader)
  if (method === 'PUT') return updateRow('Reviews', id, body)
  if (method === 'DELETE') return deleteRow('Reviews', id)
}

// ── SETTINGS ─────────────────────────────────────────────────────────────────────
function handleSettings(method, body, authHeader) {
  if (method === 'GET') {
    const rows = getAllRows('Settings')
    return rows[0] || {}
  }
  requireAuth(authHeader)
  if (method === 'PUT') {
    const rows = getAllRows('Settings')
    if (rows[0]) return updateRow('Settings', rows[0].id, body)
    return insertRow('Settings', body)
  }
}

// ── AUTH ─────────────────────────────────────────────────────────────────────────
function handleAuth(action, body) {
  if (action === 'login') {
    return login(body.username, body.password)
  }
  return { error: 'Unknown auth action' }
}

function generateOrderId() {
  return 'TGC-' + Utilities.getUuid().split('-')[0].toUpperCase()
}
