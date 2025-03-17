test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  //# Os expect mostram ao json(teste automatizado test:watch) qual é o objetivo/resultado
  //# Que tem que ser alcançado
  expect(responseBody.dependencies.database.version).toEqual("17.4");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.openned_connections).toEqual(1);
});
