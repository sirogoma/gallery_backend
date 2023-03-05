import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/userEntity'
import { Gallary } from './entity/gallaryEntity'
import { Theme } from './entity/themeEntity'
import { UserSnsId } from './entity/userSnsIdEntity'
import { Sns } from './entity/snsEntity'
import { Work } from './entity/workEntity'
import { WorkPage } from './entity/workPageEntity'
import { WorkToGallary } from './entity/workToGallaryEntity'
import { Tag } from './entity/tagEntity'
import { TagToWork } from './entity/tagToWorkEntity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'gallary_db', // コンテナ間通信はコンテナ名で名前解決される(hostsに書いたノリ)
  port: 3306,
  username: 'root', // MySQLに接続するユーザー名
  password: 'sirotan', // MySQLに接続するパスワード
  database: 'test', // データベース名
  synchronize: true, // マイグレーション　つねにテーブルを同期するか　開発中なのでtrue
  logging: true, // ログ吐くかどうか
  entities: [User, UserSnsId, Sns, Gallary, Theme, Work, WorkPage, WorkToGallary, Tag, TagToWork],
  // migrations: ['src/migration/**/*.ts'],
  subscribers: []
})

AppDataSource.initialize()
  .then(async () => {
    console.log('Here you can setup and run express / fastify / any other framework.')
  })
  .catch((error) => console.log(error))
