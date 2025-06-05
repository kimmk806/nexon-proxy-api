// api/guild.js

// Node.js 환경에서 fetch가 없다면 아래 주석 해제 후 설치 필요
// import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { guild, world } = req.query;

  if (!guild || !world) {
    return res.status(400).json({ error: '길드명과 월드명을 모두 입력해주세요.' });
  }

  try {
    const response = await fetch(
      `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${encodeURIComponent(guild)}&world_name=${encodeURIComponent(world)}`, 
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || '넥슨 API 호출 실패' });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
