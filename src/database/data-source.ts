import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Usuario } from "../entities/Usuario";

dotenv.config();

/**
 * DataSource = configuração do TypeORM (conexão com MySQL)
 */
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  // Para aula/dev: cria tabela sozinho
  // Em produção: migrations e synchronize=false
  synchronize: true,
  // pARA SABER ONDE ESTÃO AS MINHAS ENTIDADES
  logging: false,
  // pARA SABER ONDE ESTÃO AS MINHAS ENTIDADES
  entities: [Usuario],
  //ou coringa
// entities:  [ `${__dirname}/**/entities/*.{ts,js}`]
// __dirname diretorio absoluto, ** vai pegar todos os arquivos /entities que tenha entities e com a extensão ts
  
});
