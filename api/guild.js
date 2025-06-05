export default async function handler(req, res) {
  const { guild, world } = req.query;

  const response = await fetch(`https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${encodeURIComponent(guild)}&world_name=${encodeURIComponent(world)}`, {
    headers: {
      "x-nxopen-api-key": process.env.NEXON_API_KEY
    }
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
