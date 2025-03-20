import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  //# O código acima puxa uma informação(versão do server) do banco de dados com o database.query
  //# E disponibiliza a exibição graças ao SHOW
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  //#o código acima especifica as informaçoes requisitadas do ...Result

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpennedConnectionsResult = await database.query({
    text: "SELECT count(*)::int  FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpennedConnectionsValue =
    databaseOpennedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        openned_connections: databaseOpennedConnectionsValue,
      },
    },
  });
}

export default status;
