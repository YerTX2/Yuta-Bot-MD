import fg from 'api-dylux';
import axios from 'axios';
import cheerio from 'cheerio';
import {tiktok} from '@xct007/frieren-scraper';
import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import {tiktokdl} from '@bochilteam/scraper';

const handler = async (m, {conn, text, args, usedPrefix, command}) => {
  if (!text) return m.reply(`✧ Te faltó el enlace de algún video de TikTok`);
  if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) 
      return m.reply(`✧ Te faltó el enlace de algún video de TikTok`);
  
  const texto = `✨ @${m.sender.split`@`[0]} Enviando su video, espere un momento...`;

  try {
    m.react('⚡'); 
    const aa = {quoted: m, userJid: conn.user.jid};
    const prep = generateWAMessageFromContent(m.chat, {extendedTextMessage: {text: texto, contextInfo: {externalAdReply: {title: "TikTok Downloader", body: "Descarga de TikTok", thumbnail: icons, sourceUrl: yt}, mentionedJid: [m.sender]}}}, aa);
    await conn.relayMessage(m.chat, prep.message, {messageId: prep.key.id, mentions: [m.sender]});
    
    const response = await axios.get(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${args[0]}`);
    if (response.data.status) {
      const videoUrl = response.data.results.nowm;
      const desc = `*LISTO PAPU 👾*`;
      await conn.sendMessage(m.chat, {video: {url: videoUrl}, caption: desc}, {quoted: fkontak});
      return;
    }

    const dataFn = await conn.getFile(`${CFROSAPI}/api/tiktokv2?url=${args[0]}`);
    const desc1n = `*LISTO PAPU 👾*`;
    await conn.sendMessage(m.chat, {video: dataFn.data, caption: desc1n}, {quoted: fkontak});
  
  } catch (error) {
    try {
      const dataF = await tiktok.v1(args[0]);
      const desc1 = `*LISTO PAPU 👾*`;
      await conn.sendMessage(m.chat, {video: {url: dataF.play}, caption: desc1}, {quoted: fkontak});
    } catch (e1) {
      try {
        const tTiktok = await tiktokdlF(args[0]);
        const desc2 = `Tome su video de TikTok 🌸`;
        await conn.sendMessage(m.chat, {video: {url: tTiktok.video}, caption: desc2}, {quoted: fkontak});
      } catch (e2) {
        try {
          const p = await fg.tiktok(args[0]);
          const te = `*LISTO PAPU 👾*`;
          await conn.sendMessage(m.chat, {video: {url: p.nowm}, caption: te}, {quoted: fkontak});
        } catch (e3) {
          m.reply(`_*< DESCARGAS - TIKTOK />*_\n\n*🌟 Ocurrió un error. Por favor, inténtalo de nuevo más tarde.*`);
        }
      }
    }
  }
};

handler.tags = ['descargas'];
handler.help = ['tiktok'];
handler.command = ['tiktok', 'ttk', 'tt'];
handler.group = true;
export default handler;

async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) return m.reply(`✧ Te faltó el enlace de algún video de TikTok`);
  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value');
  const param = {url: url, _token: token};
  const {data} = await axios.post('https://tikdown.org/getAjax?', new URLSearchParams(Object.entries(param)), {headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'user-agent': 'Mozilla/5.0'}});
  const getdata = cheerio.load(data.html);
  if (data.status) {
    return {
      status: true, 
      thumbnail: getdata('img').attr('src'), 
      video: getdata('div.download-links > div:nth-child(1) > a').attr('href'), 
      audio: getdata('div.download-links > div:nth-child(2) > a').attr('href')
    };
  } else {
    return {status: false};
  }
}
