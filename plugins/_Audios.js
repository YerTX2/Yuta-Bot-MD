//Código creador por matias-crypto colaborador De SonGoku 
//Audio puesto por YerTX2
//si usa el audio para su bot deje los créditos 
//No seas gey no quites los créditos 😑🇦🇱

import fs from 'fs';

let handler = async (m, { conn }) => {
  let text = m.text.toLowerCase(); 
  let user = global.db.data.users[m.sender];

  const audioMap = {
    'yuta': './yuta/menu.mp3'
  };

  for (let key in audioMap) {
    if (text.includes(key)) {
      try {
        if (fs.existsSync(audioMap[key])) {
          await conn.sendFile(m.chat, audioMap[key], `${key}.mp3`, '', m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
        } else {
          m.reply('El audio correspondiente no se encontró.');
        }
      } catch (err) {
        console.error(err);
        m.reply('Ocurrió un error al intentar enviar el audio.');
      }
      break;
    }
  }
};

handler.help = ['yuta']
handler.customPrefix = /^(.yuta|)/i;
handler.command = new RegExp;
export default handler;