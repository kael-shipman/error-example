import { Translators, Types } from "../src";

describe("Thing", () => {
  const provider: Types.Db.BankingProvider = {
    id: Buffer.from("abcdef", "hex"),
    name: "Bank of America",
  }

  test("is Bank of America", () => {
    Translators.BankingProvider.dbToApi(provider);
    expect(provider.name).toBe("Bank of America");
  });
});
