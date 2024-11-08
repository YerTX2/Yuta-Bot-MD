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
   let gifUrl = "https://telegra.ph/file/5d3143ba763dba19fa349.mp4";
await conn.sendMessage(m.chat, {video: {url: gifUrl}, gifPlayback: true, caption: text.trim(), mentions: [m.sender]}, {quoted: m});



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
