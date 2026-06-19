/**
 * Generic CRUD layer over Google Sheets.
 * Each sheet's first row is the header row; column "id" is the primary key.
 */

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.appendRow(getDefaultHeaders(name))
  }
  return sheet
}

function getDefaultHeaders(name) {
  const headers = {
    Products:   ['id','name','description','price','hotPrice','coldPrice','category','categorySlug','imageUrl','isAvailable','isFeatured','isBestSeller','isNew','sortOrder','createdAt','updatedAt'],
    Categories: ['id','name','slug','icon','description','sortOrder','isActive'],
    Orders:     ['id','items','customerName','customerPhone','customerAddress','orderType','status','totalAmount','orderNotes','whatsappSent','createdAt','updatedAt'],
    Reviews:    ['id','customerName','rating','comment','productId','isApproved','createdAt'],
    Settings:   ['id','businessName','tagline','phone','whatsapp','email','address','googleMapsUrl','instagramUrl','openTime','closeTime','isOpen','googleRating','reviewCount','gaId'],
    Users:      ['id','username','passwordHash','email','role','isActive','createdAt'],
    Banners:    ['id','title','subtitle','imageUrl','ctaText','ctaLink','isActive','sortOrder'],
    Analytics:  ['id','eventName','eventData','timestamp'],
  }
  return headers[name] || ['id']
}

function getAllRows(sheetName) {
  const sheet = getSheet(sheetName)
  const data = sheet.getDataRange().getValues()
  if (data.length < 2) return []
  const headers = data[0]
  return data.slice(1).map(row => rowToObject(headers, row)).filter(o => o.id)
}

function getRowById(sheetName, id) {
  const rows = getAllRows(sheetName)
  return rows.find(r => String(r.id) === String(id)) || { error: 'Not found' }
}

function insertRow(sheetName, data) {
  const sheet = getSheet(sheetName)
  const headers = sheet.getDataRange().getValues()[0]
  if (!data.id) data.id = Utilities.getUuid()
  const row = headers.map(h => stringifyIfNeeded(data[h]))
  sheet.appendRow(row)
  return data
}

function updateRow(sheetName, id, data) {
  const sheet = getSheet(sheetName)
  const range = sheet.getDataRange()
  const values = range.getValues()
  const headers = values[0]
  const idCol = headers.indexOf('id')

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(id)) {
      const updated = { ...rowToObject(headers, values[i]), ...data }
      const newRow = headers.map(h => stringifyIfNeeded(updated[h]))
      sheet.getRange(i + 1, 1, 1, headers.length).setValues([newRow])
      return updated
    }
  }
  return { error: 'Not found' }
}

function deleteRow(sheetName, id) {
  const sheet = getSheet(sheetName)
  const values = sheet.getDataRange().getValues()
  const headers = values[0]
  const idCol = headers.indexOf('id')

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(id)) {
      sheet.deleteRow(i + 1)
      return { success: true, id }
    }
  }
  return { error: 'Not found' }
}

function rowToObject(headers, row) {
  const obj = {}
  headers.forEach((h, i) => {
    let val = row[i]
    if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
      try { val = JSON.parse(val) } catch (e) { /* keep as string */ }
    }
    if (val === 'true') val = true
    if (val === 'false') val = false
    obj[h] = val
  })
  return obj
}

function stringifyIfNeeded(val) {
  if (val === undefined || val === null) return ''
  if (typeof val === 'object') return JSON.stringify(val)
  return val
}

/**
 * One-time setup: creates all sheets with headers.
 * Run this manually from the Apps Script editor once.
 */
function setupDatabase() {
  ;['Products','Categories','Orders','Reviews','Settings','Users','Banners','Analytics']
    .forEach(name => getSheet(name))

  // Seed default settings row
  const settingsSheet = getSheet('Settings')
  if (settingsSheet.getDataRange().getValues().length < 2) {
    insertRow('Settings', {
      businessName: 'To Go Coffee',
      tagline: 'Fresh Coffee. Fast Service. Anytime.',
      phone: '+91 83470 23216',
      whatsapp: '918347023216',
      address: 'Phoenix Market, Opp. Aagam Viviana, Near Florance Apartment, Vesu, Surat, Gujarat',
      googleMapsUrl: 'https://maps.google.com/?q=Phoenix+Market+Vesu+Surat',
      instagramUrl: 'https://www.instagram.com/togocoffee.in',
      openTime: '17:00',
      closeTime: '00:00',
      isOpen: true,
      googleRating: 4.7,
      reviewCount: 58,
    })
  }
  Logger.log('Database setup complete.')
}
