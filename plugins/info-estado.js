let handler = async (m, { conn, isRowner}) => {
let _muptime
let totalreg = Object.keys(global.db.data.users).length
let totalchats = Object.keys(global.db.data.chats).length
let pp = 'https://files.catbox.moe/inanni.jpg'
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let muptime = clockString(_muptime)
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) 
const used = process.memoryUsage()
let goku = `╭─⬣「 YUTA-BOT MD」⬣\n`
goku += `│ 👑 *Creador ∙* YERTX2 \n`
goku += `│ 📚 *Grupos Unidos ∙* ${groupsIn.length}\n`
goku += `│ 👤 *Chats Privados ∙* ${chats.length - groupsIn.length}\n`
goku += `│ 💬 *Total De Chats ∙* ${chats.length}\n`
goku += `│ 🐉 *Sayayíns Registrados ∙* ${totalreg}\n`
goku += `│ ☁️ *Grupos Registrados ∙* ${totalchats}\n`
goku += `│ 🕜 *Actividad ∙* ${muptime}\n`
goku += `╰─⬣`
   let img = await (await fetch(`https://i.ibb.co/RyVfBHv/file.jpg`)).buffer()
    await m.react('⭐')
   // await conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, rcanal)
   //await conn.sendAi(m.chat, botname, textbot, text.trim(), img, img, canal, estilo)

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['status']
handler.tags = ['info']
handler.command = /^(estado|status|estate|state|stado|stats)$/i
//handler.register = true
export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}
