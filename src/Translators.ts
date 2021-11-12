import { Translator } from "@wymp/http-utils";
import { Db, Api } from "./Types";

export const BankingProvider = new Translator<Db.BankingProvider, Api.BankingProvider>(
  "/core/v1/banking-providers",
  "banking-providers",
  { name: "attr" }
);
